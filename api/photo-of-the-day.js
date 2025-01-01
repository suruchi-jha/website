import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      params: { query: "nature" },
    });
    const photo = response.data;
    res.status(200).json({
      url: photo.urls.regular,
      title: photo.alt_description || "Photo of the Day",
      photographer: photo.user.name,
      photographerProfile: photo.user.links.html,
    });
  } catch (error) {
    console.error("Error fetching photo:", error.message);
    res.status(500).json({ error: "Failed to fetch the photo." });
  }
}
