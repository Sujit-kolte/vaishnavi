const supabase = require("../config/supabase");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "User registered successfully",
      user: data.user
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Login successful",
      session: data.session,
      user: data.user
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
