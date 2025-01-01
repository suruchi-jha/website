const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get("/api/photo-of-the-day", async (req, res) => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query: "nature",
      },
    });

    const photo = response.data;

    res.json({
      url: photo.urls.regular,
      title: photo.alt_description || "Photo of the Day",
      photographer: photo.user.name,
      photographerProfile: photo.user.links.html,
    });
  } catch (error) {
    console.error("Error fetching photo from Unsplash:", error.message);
    res.status(500).json({ error: "Failed to fetch the photo from Unsplash." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

