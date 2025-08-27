const express = require("express");
const path = require("path");
const handleScannedUrl = require("./bot");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the client folder
app.use(express.static(path.join(__dirname, "..", "client")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// client sends the scanned URL here
app.post("/api/scan", async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: "No URL provided" });
  }

  console.log("Received QR URL:", data);

  const result = await handleScannedUrl(data);

  res.json({ url: data, status: result });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
