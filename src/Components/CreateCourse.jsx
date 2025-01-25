import React, { useRef } from "react";
import axios from "axios";

function CreateCourse() {
  const title = useRef(null);
  const description = useRef(null);
  const price = useRef(null);
  const imageUrl = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      courseTitle: title.current.value,
      courseDescription: description.current.value,
      coursePrice: price.current.value,
      ImageUrl: imageUrl.current.value,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:3000/admin/course", courseData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      console.log(response.data); 
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Title</p>
        <input ref={title} type="text" />
        <p>Description</p>
        <input ref={description} type="text" />
        <p>Price</p>
        <input ref={price} type="text" />
        <p>Image</p>
        <input ref={imageUrl} type="text" />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CreateCourse;
