const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables!");
  console.error("   SUPABASE_URL:", supabaseUrl ? "✓ Set" : "✗ Missing");
  console.error(
    "   SUPABASE_ANON_KEY:",
    supabaseAnonKey ? "✓ Set" : "✗ Missing",
  );
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
