import ReactQuill from "react-quill";
import React from "react";
import "react-quill/dist/quill.snow.css";

const BlogEditor = ({ value, onChange }) => {
  return (
    <div className="mt-5 p-4 bg-light rounded-lg shadow-lg border border-secondary">
      <h3 className="mb-4 text-center text-primary">Blog Editor</h3>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder="Write your blog here..."
        className="mb-4 border rounded"
      />
    </div>
  );
};

export default BlogEditor;
