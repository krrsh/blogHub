require("dotenv").config();
const express = require("express");

const app= express();
const cors = require("cors");

//port
const port = process.env.PORT || 4000;

//DB connection
require("./db/connection");

//Import routes
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

//Middleware
app.use(express.json());
app.use(cors());


//Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(port, () => {  console.log(`Server is running on port ${port}`);
});