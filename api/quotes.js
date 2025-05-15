// fetches a random motivational quote
export default async function handler(req, res) {
  if (req.method === "GET") {
    const fetch = (await import("node-fetch")).default; // dynamically import node-fetch to use fetch in Vercel
    try {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();
      res.status(200).json(data[0]); // return quote
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch quote." });
    }
  } else {
    // if method is not GET, respond with 405
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
