import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <h1 style={{ color: "red", marginBottom:"2rem" }}>Page Not Found!</h1>
      <Link to="/">Return Home</Link>
    </div>
  );
};

export default NotFound;
