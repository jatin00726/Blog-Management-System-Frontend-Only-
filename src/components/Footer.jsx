import React from "react";

const Footer = () => (
  <footer className="bg-dark text-white fixed-bottom py-3">
    <div className="container text-center">
      <p className="mb-0">
        &copy; {new Date().getFullYear()} Blog Management System. All rights
        reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
