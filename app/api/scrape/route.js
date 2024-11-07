import { NextResponse } from "next/server";
import axios from "axios";
import OpenAI from "openai";
import * as cheerio from "cheerio";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate a slug from the URL
function generateSlug(url) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\W+/g, "-")
    .toLowerCase()
    .replace(/^-|-$/g, "");
}

// Helper function to call ChatGPT for analyzing HTML content
async function analyzeHtmlContentWithChatGPT(htmlContent) {
  const prompt = `Analyze the provided HTML content and extract structured information in JSON format. Please ensure the following data fields are included with specified types:
  - subtitle (string): A description of the product.
  - features (array of strings): A list of key features or functionalities highlighted on the page (in detail for each feature).
  - differentiators (array of strings): Qualities that make this product unique or superior.
  - clients (array of strings): Names of organizations that are using this product.
  - industries (array of strings): Relevant industries to which this product applies.
  - pricing (string): Pricing details with their values (e.g., $50 per user/month or N/A if not sure).
  - summary (string): A summary of all the points highlighted into two paragraphs.

  Note: If any field is not directly available in the content, make a reasonable assumption based on context. Also, give a detailed data in return for each variable of JSON as that will be shown to users as points in paragraphs.

  HTML content:
  ${htmlContent.slice(0, 6000)}

  Provide the response in valid JSON format:
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", //gpt-4-turbo
    messages: [{ role: "user", content: prompt }],
  });

  // Parse the JSON response from ChatGPT
  const chatGPTData = JSON.parse(response.choices[0].message.content || "{}");
  return chatGPTData;
}

export async function POST(request) {
  try {
    const { url } = await request.json();

    // Validate URL input
    if (!url || !/^https?:\/\//.test(url)) {
      return NextResponse.json(
        { error: "Invalid URL provided." },
        { status: 400 }
      );
    }

    // Fetch HTML content of the URL
    const { data: htmlContent } = await axios.get(url);

    // Load HTML into Cheerio for scraping
    const $ = cheerio.load(htmlContent);

    // Extract essential details directly from the HTML
    const title = $("title").text();
    const description =
      $('meta[name="description"]').attr("content") || "No description found";
    const iconLink =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href");
    const icon = iconLink ? new URL(iconLink, url).href : null;

    // Generate a URL slug for the page
    const slug = generateSlug(url);

    // Analyze HTML content with ChatGPT to get structured data
    const chatGPTData = await analyzeHtmlContentWithChatGPT(htmlContent);

    // Merge scraped data with ChatGPT data for a final response format
    const responseData = {
      title,
      subtitle: chatGPTData.subtitle || "No subtitle found",
      features: chatGPTData.features || [],
      differentiators: chatGPTData.differentiators || [],
      clients: chatGPTData.clients || [],
      industries: chatGPTData.industries || [],
      pricing: chatGPTData.pricing || "No pricing information available",
      summary: chatGPTData.summary,
      description,
      imageUrl: icon,
      link: url,
      slug,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching the page:", error);
    return NextResponse.json(
      { error: "Failed to scrape the provided URL." },
      { status: 500 }
    );
  }
}
