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

// Helper function to generate a Markdown summary from structured data
async function generateMarkdownSummary(data) {
  const prompt = `Create a Markdown summary of the following data:
    Title: ${data.title}
    Subtitle: ${data.subtitle}
    Features: ${data.features.join(", ")}
    Differentiators: ${data.differentiators.join(", ")}
    Clients: ${data.clients.join(", ")}
    Industries: ${data.industries.join(", ")}
    Pricing: ${data.pricing}

  Provide a well-structured Markdown summary.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

export async function GET(request) {
  try {
    const url =
      "https://www.g2.com/categories/data-science-and-machine-learning-platforms";

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

    // Find all listings on the page
    const listings = $(".product-cards"); // Adjust this selector for actual page structure

    const allListingsData = [];

    for (let i = 0; i < Math.min(10, listings.length); i++) {
      const listing = listings.eq(i);
      const title = listing.find("h2").text(); // Adjust selector as needed
      const subtitle =
        listing.find(".subtitle-class").text() || "No subtitle found"; // Adjust selector as needed
      const description = listing.find("p").text(); // Adjust selector as needed
      const features = listing
        .find(".features-class")
        .map((i, el) => $(el).text())
        .get(); // Adjust selector
      const differentiators = listing
        .find(".differentiators-class")
        .map((i, el) => $(el).text())
        .get(); // Adjust selector
      const clients = listing
        .find(".clients-class")
        .map((i, el) => $(el).text())
        .get(); // Adjust selector
      const industries = listing
        .find(".industries-class")
        .map((i, el) => $(el).text())
        .get(); // Adjust selector
      const pricing =
        listing.find(".pricing-class").text() ||
        "No pricing information available"; // Adjust selector

      const iconLink = listing.find("img").attr("src");
      const icon = iconLink ? new URL(iconLink, url).href : null;
      const slug = generateSlug(title || "listing-" + (i + 1));

      // Prepare listing data object
      const listingData = {
        title,
        subtitle,
        features,
        differentiators,
        clients,
        industries,
        pricing,
        description,
        imageUrl: icon,
        link: url,
        slug,
      };

      // Generate Markdown summary for each listing
      const markdownSummary = await generateMarkdownSummary(listingData);
      listingData.markdownSummary = markdownSummary;

      allListingsData.push(listingData);
    }

    return NextResponse.json(allListingsData);
  } catch (error) {
    console.error("Error fetching the page:", error);
    return NextResponse.json(
      { error: "Failed to scrape the provided URL." },
      { status: 500 }
    );
  }
}
