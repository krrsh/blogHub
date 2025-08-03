const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get current user
router.get("/me", authMiddleware, async (req, res) => {
  const { username, email } = req.user;
  res.status(200).json({ username, email });
});

module.exports = router;