import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const BlogDetails = () => {
  const { blogs, setBlogs } = useAppContext(); // Ensure setBlogs is available
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  if (!blog) {
    return <p className="text-center text-secondary">Blog not found.</p>;
  }

  const handleAddComment = () => {
    if (!name || !comment) {
      alert("Please fill out both fields before posting!");
      return;
    }

    const newComment = {
      id: blog.comments.length + 1,
      name,
      content: comment,
      timestamp: new Date().toLocaleString(),
    };

    // Update the blogs list with the new comment
    const updatedBlogs = blogs.map((b) =>
      b.id === parseInt(id) ? { ...b, comments: [...b.comments, newComment] } : b
    );

    setBlogs(updatedBlogs); // Use setBlogs from context to update state
    setName("");
    setComment("");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center">{blog.title}</h1>
          <p className="text-muted text-center">
            <small>
              by {blog.author} on {blog.date}
            </small>
          </p>
          {/* Main content section with image and text */}
          <div className="d-flex flex-wrap align-items-start mt-4">
            {blog.image && (
              <img
                src={blog.image.base64}
                alt="Blog"
                className="rounded-lg me-4 mb-4"
                style={{
                  maxWidth: "50%", // Adjust percentage as needed
                  objectFit: "cover",
                }}
              />
            )}
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
              style={{ flex: 1 }}
            />
          </div>
          <div className="mt-4">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="badge bg-primary me-2 text-white"
                style={{ fontSize: "0.85rem" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-5">
        <h2 className="text-secondary">Comments</h2>

        {/* Comment List */}
        <div className="mt-3">
          {blog.comments.map((c) => (
            <div key={c.id} className="p-3 mb-3 rounded border bg-light">
              <p className="mb-1">
                <strong>{c.name}</strong> - <small>{c.timestamp}</small>
              </p>
              <p className="text-muted">{c.content}</p>
            </div>
          ))}
          {blog.comments.length === 0 && (
            <p className="text-muted">No comments yet. Be the first to comment!</p>
          )}
        </div>

        {/* Comment Form */}
        <div className="mt-4">
          <h4 className="text-dark">Add a Comment</h4>
          <div className="d-flex flex-column flex-md-row align-items-start mt-3">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control me-2 mb-2 mb-md-0"
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-control me-2 mb-2 mb-md-0"
              style={{ flex: 2 }}
            />
            <button
              onClick={handleAddComment}
              className="btn btn-primary"
              style={{
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                color: "white",
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
