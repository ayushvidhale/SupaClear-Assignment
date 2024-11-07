"use server";
import connect from "@/utils/db";
import Listing from "@/models/listing";

// 1. Get all listings
export async function getAllListings() {
  try {
    await connect();

    const listings = await Listing.find({});
    console.log(listings);

    return { success: true, listings: JSON.stringify(listings) };
  } catch (error) {
    console.error("Error retrieving listings:", error);
    return { success: false, message: "Failed to retrieve listings." };
  }
}
