import mongoose, { Schema } from "mongoose";

const ScanSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Scan = mongoose.model("Scan", ScanSchema);
