import BlogCard from "../../components/BlogCard/BlogCard";
import Navbar from "../../components/Navbar/Navbar";
import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const homePage = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching data
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/blogs");
        setBlogsData(res.data);
      } catch (err) {
        console.error("Blog fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  {
    loading ? (
      <div className="spinner">Loading...</div>
    ) : (
      blogsData.map((blog) => <BlogCard key={blog._id} blog={blog} />)
    );
  }

  return (
    <div className="homePage-container">
      <Navbar />
      {loading ? (
      <div className="spinner">Loading...</div>
    ) : blogsData.length === 0 ? (
      <h2>No blogs found</h2>
    ) : (
      blogsData.map((blog) => (
        <BlogCard
          key={blog._id}
          id={blog._id}
          title={blog.title}
          summary={blog.summary}
          createdAt={blog.createdAt}
          updatedAt={blog.updatedAt}
        />
      ))
    )}
    </div>
  );
};

export default homePage;
