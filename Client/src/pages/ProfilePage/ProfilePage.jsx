import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import BlogCard from "../../components/blogCard/BlogCard.jsx";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const { user, token, dispatch } = useAuthContext();

  const fetchUserBlogs = async () => {
    if (!token) {
      console.error("Missing token");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get("https://bloghub-atng.onrender.com/api/blogs/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch user blogs", err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("https://bloghub-atng.onrender.com/api/auth/logout");
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      navigate("/loginPage");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="profilePage-container">
      <Navbar />
      <div className="profileContainer">
        <div>
          <h3>{user?.username}</h3>
          <h4>{user?.email}</h4>
        </div>
        <button onClick={handleLogout} className="logoutBtn">
          Logout
        </button>
      </div>
      <div className="sectionLine"></div>
      <div className="profileBlogs">
        <h1>Your Blogs</h1>
        {loading ? (
      <div className="loadingContainer"><div className="spinner"></div></div>
        ) : blogs.length === 0 ? (
          <h1 className="noBlogs">You haven't written any... Start writing!</h1>
        ) : (
          blogs.map((blogs) => (
            <BlogCard
              key={blogs._id}
              id={blogs._id}
              title={blogs.title}
              summary={blogs.summary}
              createdAt={blogs.createdAt}
              updatedAt={blogs.updatedAt}
              isOwnBlog={true}
              username={blogs.username}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
