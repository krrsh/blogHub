import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/blogLogo.png";
import burger from "../../assets/burgerIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

const Navbar = () => {


  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments.filter(Boolean).pop();

  const navPage = lastSegment === "profilePage" ? "Profile" : lastSegment === "homePage" ? "Explore" : "";

  const [creatingBlog, setCreatingBlog] = useState(false);
  const [menuIcon, setMenuIcon] = useState(false);
  const [blogDetails, setBlogDetails] = useState({
    title: "", 
    summary: "",
    content: "",
  });
    const { token } = useAuthContext();

  const handleProfileLink = () => {
    navigate("/profilePage");
  };
  const handleExploreLink = () => {
    navigate("/homePage");
  };
  const handleCloseMenu = (e) => {
    e.stopPropagation();
    setMenuIcon(false);
  };
  const handlePublish = () => {
    if (blogDetails.title && blogDetails.summary && blogDetails.content) {
      axios.post("https://bloghub-atng.onrender.com/api/blogs", blogDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        })
        .then((response) => {
          console.log("Blog published successfully:", response.data);
          setCreatingBlog(false);
          setBlogDetails({ title: "", summary: "", content: "" });
          navigate(0);
        })
        .catch((error) => {
          console.error("Error publishing blog:", error);
        });
    } else {
      alert("Please fill in all fields before publishing.");
    }
  }

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>Blog Hub</h1>
      </div>
      <div className="nav-links">
        <button onClick={() => setCreatingBlog(true)}>+ Create</button>
        <p
          onClick={handleExploreLink}
          style={{ color: navPage === "Explore" && "#129bad" }}
        >
          Explore
        </p>
        <p
          onClick={handleProfileLink}
          style={{ color: navPage === "Profile" && "#129bad" }}
        >
          Profile
        </p>
        <img
          onClick={() => setMenuIcon(!menuIcon)}
          src={burger}
          alt="MenuIcon"
        />
      </div>

      {/* Side Navbar */}
      <div
        className="side-navbar"
        style={{
          position: "fixed",
          top: 0,
          right: menuIcon ? 0 : "-70vw",
          height: "100%",
          width: "70vw",
          maxWidth: "100vw",
          background: "#bae8ee",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          transition: "right 0.3s",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          paddingTop: "60px",
        }}
      >
        <span
          className="closeMenu"
          onClick={handleCloseMenu}
        >
          &times;
        </span>
        <p
          onClick={() => {
            setMenuIcon(false);
            navigate("/homePage");
          }}
          style={{
            color: navPage === "Explore" ? "#129bad" : "#333",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Explore
        </p>
        <p
          onClick={() => {
            setMenuIcon(false);
            navigate("/profilePage");
          }}
          style={{
            color: navPage === "Profile" ? "#129bad" : "#333",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Profile
        </p>
      </div>
      {/* Create Blog Overlay */}
      {creatingBlog && (
        <div className="overlay">
          <div className="overlay-content">
<input
  value={blogDetails.title}
  onChange={(e) => setBlogDetails({ ...blogDetails, title: e.target.value })}
  type="text"
  placeholder="Title"
/>

<input
  value={blogDetails.summary}
  onChange={(e) => setBlogDetails({ ...blogDetails, summary: e.target.value })}
  type="text"
  placeholder="Summary"
/>

<textarea
  className="contentInput"
  value={blogDetails.content}
  onChange={(e) => setBlogDetails({ ...blogDetails, content: e.target.value })}
  placeholder="Start writing..."
></textarea>

            <div className="overlayButtonContainer">
              <button
                onClick={() => setCreatingBlog(false)}
                className="blogCancelBtn"
              >
                Cancel
              </button>
              <button onClick={handlePublish} className="publishBtn">Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
