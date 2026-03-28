import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    image: String,
  },
  { timestamps: true },
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
