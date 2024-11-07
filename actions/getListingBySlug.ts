"use server";
import connect from "@/utils/db";
import Listing from "@/models/listing";

// 2. Get listing by slug
export async function getListingBySlug({ slug }: { slug: string }) {
  try {
    await connect();

    const listing = await Listing.findOne({ slug });
    if (!listing) {
      return { success: false, message: "Listing not found." };
    }
    console.log(listing);

    return { success: true, listing: listing };
  } catch (error) {
    console.error("Error retrieving listing:", error);
    return { success: false, message: "Failed to retrieve listing." };
  }
}
