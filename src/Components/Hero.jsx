import React from "react";
import { Link } from "react-router-dom";
import "./hero.css"; 

function Hero() {
  return (
    <div className="hero">
      <h1 className="title">Learn from the Best. Become the Best.</h1>
      <p className="paragraph">
        Browse through a wide variety of courses designed to help you unlock
        your potential and achieve your goals at your own pace.
      </p>
      <Link  to={"/course"}>   <button className="coursesBtn">View Courses</button> </Link>
    </div>
  );
}

export default Hero;
