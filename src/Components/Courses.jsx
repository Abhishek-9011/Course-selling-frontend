import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useFetch from "../Hooks/useFetch";
import "./courses.css";

function Courses() {
  const { data, error, loading } = useFetch(
    "http://localhost:3000/course/preview"
  );
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Optionally remove invalid token
      }
    } else {
      console.error("No token found in localStorage");
    }
  }, []);

  // Check for loading, error, or missing userId
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!userId) return <p className="error">You need to sign in to view courses. <a href="/login">Sign In</a></p>;

  return (
    <div className="courses-container">
      {data.course.map((course) => (
        <CourseBlock
          userId={userId} // Pass the decoded user ID
          key={course._id}
          courseId={course._id}
          title={course.courseTitle}
          description={course.courseDescription}
          price={course.coursePrice}
          imageUrl={course.ImageUrl}
        />
      ))}
    </div>
  );
}

function CourseBlock({ userId, courseId, title, description, price, imageUrl }) {
  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("token");

      // Send the token in the Authorization header (Bearer token)
      const response = await axios.post(
        "http://localhost:3000/course/purchase",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Purchase failed:", error.response?.data || error.message);
      alert("Failed to purchase the course. Please try again.");
    }
  };

  return (
    <div className="courseBox">
      <img src={imageUrl} alt="Course Thumbnail" />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <button>View Course</button>
      <button style={{ marginTop: "10px" }} onClick={handlePurchase}>
        Purchase Course
      </button>
    </div>
  );
}

export default Courses;
