"use server";
import connect from "@/utils/db";
import Listing from "@/models/listing";

export async function createListing({
  title,
  subtitle,
  features,
  differentiators,
  clients,
  industries,
  pricing,
  imageUrl,
  link,
  slug,
  summary,
}: {
  title: string;
  subtitle: string;
  features: string[];
  differentiators: string[];
  clients: string[];
  industries: string[];
  pricing: string;
  imageUrl: string;
  link: string;
  slug: string;
  summary: string;
}) {
  try {
    await connect();

    const newListing = new Listing({
      title,
      subtitle,
      features,
      differentiators,
      clients,
      industries,
      pricing,
      imageUrl,
      link,
      slug,
      summary,
    });

    await newListing.save();
    console.log("Listing created:", newListing);

    return { success: true, listing: JSON.stringify(newListing) };
  } catch (error) {
    console.error("Error creating listing:", error);
    return { success: false, message: "Failed to create listing." };
  }
}
