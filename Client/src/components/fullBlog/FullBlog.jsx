import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./FullBlog.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FullBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    summary: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
      </div>
    );
  }

  //editing the blog
  const handleEdit = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/blogs/${id}`);
      const { title, summary, content } = response.data;
      setBlogDetails({ title, summary, content });
      setShowEdit(true);
    } catch (error) {
      console.error("Failed to fetch blog for editing:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="blogPage-container">
        <div className="titleSection">
          <h2>{blog.title}</h2>
        </div>
        <div className="blogpage-details">
          <p>Author</p>
          <p>
            Published on:{" "}
            {new Date(blog.createdAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p>
            Last updated on:{" "}
            {new Date(blog.updatedAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
        <p className="description">
          {" "}
          <span style={{ fontWeight: "700" }}>Summary : </span>
          {blog.summary}
        </p>
        <p className="blog-content">{blog.content}</p>
      </div>


      {/* Edit Blog Overlay */}
      {showEdit && (
        <div className="overlay">
          <div className="overlay-content">
            <input
              value={blogDetails.title}
              onChange={(e) =>
                setBlogDetails({ ...blogDetails, title: e.target.value })
              }
              type="text"
              placeholder="Title"
            />
            <input
              value={blogDetails.summary}
              onChange={(e) =>
                setBlogDetails({ ...blogDetails, summary: e.target.value })
              }
              type="text"
              placeholder="Summary"
            />
            <textarea
              className="contentInput"
              value={blogDetails.content}
              onChange={(e) =>
                setBlogDetails({ ...blogDetails, content: e.target.value })
              }
              placeholder="Start writing..."
            ></textarea>
            <div className="overlayButtonContainer">
              <button
                onClick={() => setShowEdit(false)}
                className="blogCancelBtn"
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className="updateBtn">
                Update
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Delete Confirmation Overlay */}
      {showOverlay && (
        <div className="deleteOverlay">
          <div className="deleteDialog">
            <p>Are you sure you want to delete this blog?</p>
            <div className="deleteButtons">
              <button onClick={deleteBlog} className="confirmBtn">
                Delete
              </button>
              <button
                onClick={() => setShowOverlay(false)}
                className="cancelBtn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullBlog;
