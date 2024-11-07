import mongoose from "mongoose";

const { Schema } = mongoose;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    differentiators: {
      type: [String],
      required: true,
    },
    clients: {
      type: [String],
      required: true,
    },
    industries: {
      type: [String],
      required: true,
    },
    pricing: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      match: [/^https?:\/\/.+/i, "Please enter a valid URL."],
    },
    link: {
      type: String,
      required: true,
      match: [/^https?:\/\/.+/i, "Please enter a valid URL."],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Listing ||
  mongoose.model("Listing", listingSchema);
