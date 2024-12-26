'use client';
import React, { useEffect, useState } from "react";

const PhotoOfTheDay = () => {
  const [photoData, setPhotoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/photo-of-the-day");
        if (!response.ok) {
          throw new Error("Failed to fetch photo");
        }
        const data = await response.json();
        setPhotoData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPhoto();
  }, []);

  if (error) {
    return <p>Error fetching photo: {error}</p>;
  }

  if (!photoData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Photo of the Day</h1>
      <img src={photoData.url} alt={photoData.title} style={{ maxWidth: "100%", maxHeight:"50%" }} />
      <p>{photoData.title}</p>
      <p>
        Photo by <a href={photoData.photographerProfile}>{photoData.photographer}</a>
      </p>
    </div>
  );
};

export default PhotoOfTheDay;

