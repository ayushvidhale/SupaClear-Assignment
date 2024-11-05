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
  const prompt = `Analyze the following HTML content and extract structured information in JSON format. The information should include:
    - subtitle: a concise summary of the page's main purpose.
    - features: a list of unique features or functions.
    - differentiators: key qualities that distinguish this page's content.
    - clients: types of users or organizations likely to benefit from the content.
    - industries: relevant industries where the content applies.
    - pricing: any available pricing details.
  
  HTML content:
  ${htmlContent.slice(0, 3000)} // Limiting the HTML snippet to 3000 characters for clarity
  \n\nProvide the response in JSON format:`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
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
