import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import BlogEditor from "../components/BlogEdit";

const CreateEditBlog = () => {
  const { blogs, setBlogs } = useAppContext();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const modalRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const blogToEdit = blogs.find((blog) => blog.id === parseInt(id));
      if (blogToEdit) {
        setTitle(blogToEdit.title);
        setTags(blogToEdit.tags.join(", "));
        setContent(blogToEdit.content);
        if (blogToEdit.image) {
          setImageUrl(blogToEdit.image.base64);
        }
      }
    }
  }, [id, blogs]);

  const handleSave = () => {
    if (!title || !tags || !content) {
      alert("Please fill out all required fields (Title, Tags, Content)!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = image
        ? {
            name: image.name,
            type: image.type,
            size: image.size,
            base64: reader.result,
          }
        : null;

      if (id) {
        const updatedBlogs = blogs.map((blog) =>
          blog.id === parseInt(id)
            ? {
                ...blog,
                title,
                tags: tags.split(",").map((tag) => tag.trim()),
                content,
                image: imageData,
              }
            : blog
        );
        setBlogs(updatedBlogs);
      } else {
        const newBlog = {
          id: blogs.length + 1,
          title,
          tags: tags.split(",").map((tag) => tag.trim()),
          content,
          author: "Current User", // Replace with actual user info
          date: new Date().toISOString().split("T")[0],
          comments: [],
          image: imageData,
        };
        setBlogs([...blogs, newBlog]);
      }
      closeModal();
      navigate("/dashboard");
    };

    if (image) {
      reader.readAsDataURL(image);
    } else {
      // Save the blog even if no image is uploaded
      reader.onloadend();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Blurred Background */}
      <div
        style={{
          filter: isModalOpen ? "blur(5px)" : "none",
        }}
        className="p-4"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          {id ? "Edit Blog" : "Create Blog"}
        </h1>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
        />
        <BlogEditor value={content} onChange={setContent} />
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
          }}
          className="mt-4"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Blog Preview"
            className="mt-4 rounded-lg"
            style={{ maxWidth: "100%" }}
          />
        )}
        <button
          onClick={openModal}
          style={{
            backgroundColor: "rgb(79, 70, 229)", // Indigo-600
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            marginTop: "16px",
          }}
          className="hover:bg-indigo-700"
        >
          {id ? "Update Blog" : "Preview & Publish"}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            zIndex: 1000,
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "90%",
            overflowY: "auto",
          }}
        >
          <h2 className="text-2xl font-bold mb-4">{title || "Untitled Blog"}</h2>
          <p className="text-sm text-gray-500 mb-4">
            Tags: {tags || "No tags provided"}
          </p>
          {imageUrl && <img src={imageUrl} alt="Blog Preview" className="rounded-lg mb-4" />}
          <div
            className="prose mt-4"
            dangerouslySetInnerHTML={{ __html: content || "<p>No content</p>" }}
          />
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "rgb(220, 38, 38)", // Red-600
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
              className="hover:bg-red-700"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "rgb(34, 197, 94)", // Green-600
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
              className="hover:bg-green-700"
            >
              Confirm & Publish
            </button>
          </div>
        </div>
      )}

      {/* Modal Background */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={closeModal}
        ></div>
      )}
    </>
  );
};

export default CreateEditBlog;
