require("dotenv").config(); 
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/photo-of-the-day", async (req, res) => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    });

    const { urls, user, alt_description } = response.data;
    res.json({
      url: urls.regular,
      title: alt_description || "Photo of the Day",
      photographer: user.name,
      photographerProfile: user.links.html,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photo" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
