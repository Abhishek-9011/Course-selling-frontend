import React, { useEffect, useState } from "react";
import axios from "axios";
import "./courses.css";

function Purchases() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          throw new Error("Token is required");
        }

        const response = await axios.get("http://localhost:3000/user/purchases", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });

        setData(response.data); // Set the response data
      } catch (err) {
        setError(err.message || "Something went wrong"); // Handle error
      } finally {
        setLoading(false); // Set loading to false when request completes
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []);
  console.log(data);
  
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="courses-container">
      {data?.courseData?.length > 0 ? (
        data.courseData.map((course) => (
          <CourseBlock
            key={course._id}
            courseId={course._id}
            title={course.courseTitle}
            description={course.courseDescription}
            price={course.coursePrice}
            imageUrl={course.ImageUrl}
          />
        ))
      ) : (
        <p>No purchases found</p>
      )}
    </div>
  );
}

function CourseBlock({ title, description, price, imageUrl }) {
  return (
    <div className="courseBox">
      <img src={imageUrl} alt="Course Thumbnail" />
      <h1>{title}</h1>
      <p>{description}</p>
      <br />
      <p>Price: ${price}</p>
      <br />
      <button>View Course</button>
    </div>
  );
}

export default Purchases;
