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
    await page.goto("https://www.capterra.com/machine-learning-software/");

    const products = await page.evaluate(() => {
      const productElements = document.querySelectorAll(
        '[id^="product-card-container"]'
      );
      const data = [];

      productElements.forEach((product) => {
        // Extract the product name
        const name = product.querySelector("a.sb.link h2")?.innerText || "";

        // Extract the product description
        const description =
          product.querySelector(".text-neutral-99")?.innerText || "";

        // Extract the product image URL
        const image =
          product.querySelector('img[alt="product-logo"]')?.src || "";

        // Extract the rating and number of reviews
        const rating =
          product.querySelector(".star-rating-label")?.innerText || "";

        // Extract the features
        const features = Array.from(
          product.querySelectorAll(
            '[data-testid="product-card-category-features"] span'
          )
        ).map((feature) => feature.innerText);

        data.push({ name, description, image, rating, features });
      });

      return data;
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
