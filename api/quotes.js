import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();
      res.status(200).json(data[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch quote." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
