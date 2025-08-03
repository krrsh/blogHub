const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    user: {type: String},
  },
  { timestamps: true }
);

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;
