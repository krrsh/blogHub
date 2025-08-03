const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/BlogHub")
.then(() => {
  console.log("Database connected successfully")
})
.catch((error) => {
  console.error("Database connection failed: ", error);
});