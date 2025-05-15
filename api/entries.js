import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("entries")
      .select("date, mood, text")
      .order("date", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  }

  else if (req.method === "POST") {
    const { mood, text } = req.body;
    const entry = {
      date: new Date().toISOString().split("T")[0],
      mood,
      text
    };

    const { error } = await supabase.from("entries").insert([entry]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: "Entry saved", entry });
  }

  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
