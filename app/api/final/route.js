import puppeteer from "puppeteer";

// Array of User-Agents to randomly select from
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
  "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
];

// Function to generate a random delay
const randomDelay = (min = 1000, max = 3000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export async function GET(request) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set a random User-Agent and viewport size
    const randomUserAgent =
      userAgents[Math.floor(Math.random() * userAgents.length)];
    await page.setUserAgent(randomUserAgent);

    // Randomize viewport dimensions
    const width = Math.floor(Math.random() * (1920 - 1024 + 1)) + 1024;
    const height = Math.floor(Math.random() * (1080 - 768 + 1)) + 768;
    await page.setViewport({ width, height });

    await page.goto("https://www.capterra.com/machine-learning-software/", {
      waitUntil: "networkidle2",
    });

    // Collect product links on the main page and limit to 5 links
    const productLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a.sb.link[href*="/p/"]'))
        .slice(0, 2) // Limit to the first 5 links
        .map((anchor) => ({
          name: anchor.innerText,
          url: anchor.href,
        }));
    });

    const products = [];

    // Loop through each product link and extract detailed information
    for (const product of productLinks) {
      const productPage = await browser.newPage();

      // Set a random User-Agent and viewport size for each product page
      const randomUserAgent =
        userAgents[Math.floor(Math.random() * userAgents.length)];
      await productPage.setUserAgent(randomUserAgent);
      await productPage.setViewport({
        width: Math.floor(Math.random() * (1920 - 1024 + 1)) + 1024,
        height: Math.floor(Math.random() * (1080 - 768 + 1)) + 768,
      });

      try {
        await productPage.goto(product.url, { waitUntil: "networkidle2" });

        // Scroll and delay to simulate human interaction
        await productPage.evaluate(() =>
          window.scrollBy(0, window.innerHeight / 2)
        );
        await new Promise((resolve) =>
          setTimeout(resolve, randomDelay(1500, 3000))
        ); // Introduce random delay

        const productDetails = await productPage.evaluate(() => {
          const name = document.querySelector("h1")?.innerText || "";
          const description =
            document.querySelector(".product-description-class")?.innerText ||
            "";
          const rating =
            document.querySelector(".star-rating-label")?.innerText || "";
          const features = Array.from(
            document.querySelectorAll(".feature-list-class span")
          ).map((feature) => feature.innerText);

          return { name, description, rating, features };
        });

        products.push({ ...product, ...productDetails });
      } catch (error) {
        console.error(`Failed to scrape product: ${product.name}`, error);
      } finally {
        await productPage.close(); // Close tab after scraping
      }

      // Add a random delay before moving to the next product
      await new Promise((resolve) =>
        setTimeout(resolve, randomDelay(2000, 5000))
      );
    }

    await browser.close();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to scrape data" }), {
      status: 500,
    });
  }
}
