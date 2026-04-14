const supabase = require("../config/supabaseClient");

// CREATE RESUME
exports.createResume = async (req, res) => {
  const { content } = req.body;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from("resumes")
    .insert([{ user_id, content }]);

  if (error) return res.status(400).json({ error });

  res.json(data);
};

// GET RESUMES
exports.getResumes = async (req, res) => {
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user_id);

  res.json(data);
};