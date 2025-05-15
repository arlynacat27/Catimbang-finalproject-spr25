import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("GET error:", error.message);
        return res.status(500).json({ error: error.message });
      }

      console.log("Fetched entries:", data);
      return res.status(200).json(data);
    } catch (err) {
      console.error("Unexpected GET error:", err.message);
      return res.status(500).json({ error: "Unexpected GET error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { mood, text } = req.body;

      const entry = {
        date: new Date().toISOString().split("T")[0],
        mood,
        text,
      };

      const { error } = await supabase.from("entries").insert([entry]);

      if (error) {
        console.error("POST error:", error.message);
        return res.status(500).json({ error: error.message });
      }

      console.log("Saved entry:", entry);
      return res.status(201).json({ message: "Entry saved", entry });
    } catch (err) {
      console.error("Unexpected POST error:", err.message);
      return res.status(500).json({ error: "Unexpected POST error" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
