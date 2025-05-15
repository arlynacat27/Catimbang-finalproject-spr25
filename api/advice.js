// fetches random advice 
export default async function handler(req, res) {
  if (req.method === "GET") {
    const fetch = (await import("node-fetch")).default; // uese dynamic import for node-fetch for Vercel
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      res.status(200).json(data.slip); // return advice 
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch advice." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
