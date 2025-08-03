const Blog = require("../models/blogModel");
const jwt = require("jsonwebtoken");

// Get all blogs

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

//Get a single blog by ID
const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ Error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

//Post a new blog
const postABlog = async (req, res) => {
  const { title, summary, content } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const blog = await Blog.create({
      title,
      summary,
      content,
      user: decoded.email,
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, summary, content } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, summary, content },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ Error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

//Delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ Error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  getAllBlogs,
  postABlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
