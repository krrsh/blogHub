import { useNavigate } from "react-router-dom";
import "./BlogCard.css";
import dlt from "../../assets/dlt.png";
import { useState } from "react";
import axios from "axios";

const BlogCard = ({isOwnBlog, id, title, summary, createdAt, updatedAt }) => {
  const navigate = useNavigate();

  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    summary: "",
    content: "",
  });

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

  const handleUpdate = () => {
    if (blogDetails.title && blogDetails.summary && blogDetails.content) {
      axios
        .put(`http://localhost:4000/api/blogs/${id}`, blogDetails)
        .then((response) => {
          console.log("Blog updated successfully:", response.data);
          setShowEdit(false);
          setBlogDetails({ title: "", summary: "", content: "" });
          navigate(0);
        })
        .catch((error) => {
          console.error("Error updating blog:", error);
        });
    } else {
      alert("Please fill in all fields before updating.");
    }
  };

  //deleting the blog
  const deleteBlog = () => {
    axios
      .delete(`http://localhost:4000/api/blogs/${id}`)
      .then((response) => {
        console.log("Blog deleted successfully:", response.data);
        setShowDeleteOverlay(false);
        navigate(0);
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
        setShowDeleteOverlay(false);
      });
  };

  return (
    <>
      <div className="blogCard">
        <h2>{title}</h2>
        <div className="blogCard-details">
          <p>Author</p>
          <p>
            Published on:{" "}
            {new Date(createdAt).toLocaleString("en-IN", {
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
            {new Date(updatedAt).toLocaleString("en-IN", {
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
        <p className="content">
          <span style={{ fontWeight: "700" }}>Summary : {summary}</span>
        </p>
        <div className="blogCard-btns">
          <button onClick={() => navigate(`/blogs/${id}`)} className="viewBtn">
            View full blog
          </button>
          {isOwnBlog && (
                      <div className="blogCard-actions">
            <button onClick={handleEdit} className="editBtn">Edit Post</button>
            <img
              className="deleteBtn"
              src={dlt}
              alt="deleteIcon"
              onClick={() => setShowDeleteOverlay(true)}
            />
          </div>
          )}
        </div>
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

      {showDeleteOverlay && (
        <div className="deleteOverlay">
          <div className="deleteDialog">
            <p>Are you sure you want to delete this blog?</p>
            <div className="deleteButtons">
              <button onClick={deleteBlog} className="confirmBtn">
                Delete
              </button>
              <button
                onClick={() => setShowDeleteOverlay(false)}
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

export default BlogCard;
