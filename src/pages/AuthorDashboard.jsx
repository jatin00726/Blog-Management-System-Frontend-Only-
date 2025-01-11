import React from "react";
import { useAppContext } from "../context/AppContext";
import BlogCard from "../components/BlogCards";
import { useNavigate } from "react-router-dom";

const AuthorDashboard = () => {
  const { blogs, setBlogs } = useAppContext();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/create/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800">Your Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="relative border rounded-lg shadow-md p-4">
            <BlogCard {...blog} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => handleEdit(blog.id)}
                style={{
                  backgroundColor: "#F59E0B", // Yellow-500
                  color: "#FFFFFF",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                style={{
                  backgroundColor: "#EF4444", // Red-500
                  color: "#FFFFFF",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            You have not authored any blogs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthorDashboard;
