import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import BlogCard from "../components/BlogCards";
import SearchBar from "../components/Search";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogs } = useAppContext();
  const [searchValue, setSearchValue] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchResults = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue.toLowerCase())
        ) ||
        blog.author.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBlogs(searchResults);
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Explore Blogs
        </h1>
        <div className="max-w-xl mx-auto">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            className="shadow-md bg-white rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
          {filteredBlogs.length === 0 && (
            <div className="col-span-full mt-8">
              <p className="text-gray-500 text-lg">No blogs found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;