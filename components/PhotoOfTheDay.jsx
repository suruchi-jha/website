'use client';
import React, { useEffect, useState } from "react";

const PhotoOfTheDay = () => {
  const [photoData, setPhotoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch("https://website-suruchi-jhas-projects.vercel.app/api/photo-of-the-day");
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
    <div className="max-w-2xl mx-auto p-4 rounded-lg shadow-lg">
      <img
        src={photoData.url}
        alt={photoData.title}
        className="w-full h-auto rounded-lg mx-auto"
      />
      <h2 className="mt-4 text-xl font-semibold">{photoData.title}</h2>
      <p className="text-gray-600">
        Photo by{" "}
        <a
          href={photoData.photographerProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {photoData.photographer}
        </a>
      </p>
    </div>
  );
};

export default PhotoOfTheDay;


