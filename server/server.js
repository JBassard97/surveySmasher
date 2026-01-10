const express = require("express");
const path = require("path");
const { handleScannedUrl } = require("./bot");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve client static files
app.use(express.static(path.join(__dirname, "../client")));
app.use(express.json());

// API endpoint for QR scan
app.post("/api/scan", async (req, res) => {
  const url = req.body.data;
  const status = await handleScannedUrl(url);
  res.json({ url, status });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
