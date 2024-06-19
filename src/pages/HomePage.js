import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>
        <Link to="/">Çıkış Yap</Link>
      </p>
    </div>
  );
};

export default HomePage;
