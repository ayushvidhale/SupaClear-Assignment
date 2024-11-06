import puppeteer from "puppeteer";

export async function GET(request) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    );
    await page.goto("https://github.com/mendableai/firecrawl", {
      waitUntil: "networkidle2",
    });

    // Extract product names directly from the page
    const pageContent = await page.evaluate(() => document.body.innerHTML);
    console.log(pageContent); // Log the content to check if the page loaded as expected

    const products = await page.evaluate(() => {
      const productElements = document.querySelectorAll(
        ".segmented-shadow-card__segment.segmented-shadow-card__segment--multi-part"
      );

      const productList = [];
      productElements.forEach((product) => {
        const nameElement = product.querySelector(
          '.product-card__product-name [itemprop="name"]'
        );
        const name = nameElement ? nameElement.textContent.trim() : null;
        if (name) productList.push({ name });
      });

      return productList;
    });

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
