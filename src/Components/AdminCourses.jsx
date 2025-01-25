import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminCourses() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/course/bulk", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        setData(response.data); // Assuming the data contains 'courses' property
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data || !data.courses || data.courses.length === 0) {
    return <p>No courses available</p>;
  }

  return (
    <div>
      {data.courses.map((course) => (
        <CourseBlock
          key={course._id}
          title={course.courseTitle}
          description={course.courseDescription}
          price={course.coursePrice}
          imageUrl={course.ImageUrl}
        />
      ))}
    </div>
  );
}

function CourseBlock({ title, description, price, imageUrl }) {
  return (
    <div className="courseBox">
      <img src={imageUrl} alt={title} />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <button>View Course</button>
      <button style={{ marginTop: "10px" }}>Purchase Course</button>
    </div>
  );
}

export default AdminCourses;
