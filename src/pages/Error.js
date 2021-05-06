import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Ooops!</h1>
        <Link to="/" className="btn btn-primary">
          {" "}
          Back to main page
        </Link>
      </div>
    </section>
  );
};

export default Error;
