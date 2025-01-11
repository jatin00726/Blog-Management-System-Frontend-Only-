import React from "react";

const SearchBar = ({ value, onChange, onSearch, className }) => (
  <div className={`d-flex ${className} align-items-center`}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search blogs by title, tags, or author"
      className="form-control me-2 py-2 fs-5 border rounded-pill shadow-sm"
      style={{ maxWidth: "500px", minWidth: "300px" }}
    />
    <button
      onClick={onSearch}
      className="btn btn-primary py-2 fs-5 rounded-pill shadow-sm hover-underline-animation"
    >
      Search
    </button>
  </div>
);

export default SearchBar;
