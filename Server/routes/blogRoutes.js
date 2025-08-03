const express = require("express");
const blog = require("../models/blogModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

//Importing controller
const { getAllBlogs, postABlog, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogsController");


// Get all blogs
router.get("/", getAllBlogs);

//get blogs by user
router.get("/user", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const blogs = await blog.find({ user: decoded.email }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Get a single blog by ID
router.get("/:id", getBlogById)

//Post a new blog
router.post("/", postABlog)

//Update a blog
router.put("/:id", updateBlog)

//Delete a blog
router.delete("/:id", deleteBlog)



module.exports = router;