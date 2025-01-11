import React from "react";
import { Link } from "react-router-dom";
import "./BogCard.css"
import { stripHtmlTags } from "./utils";

const BlogCard = ({ id, title, content, tags, author, date }) => (
  <div className="blog-card">
    <h2 className="blog-title">{title}</h2>
    <p className="blog-content">{stripHtmlTags(content).substring(0, 100)}...</p>
    <div className="blog-footer">
      <p className="blog-author">By {author}</p>
      <p className="blog-date">{date}</p>
    </div>
    <div className="blog-tags">
      {tags.map((tag, index) => (
        <span key={index} className="blog-tag">
          {tag}
        </span>
      ))}
    </div>
    <div className="mt-4">
      <Link
        to={`/blog/${id}`} // This will navigate to the BlogDetails component
        className="text-blue-600 hover:text-blue-800"
      >
        Read More
      </Link>
    </div>
  </div>
);

export default BlogCard;
