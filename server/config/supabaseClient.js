const { createClient } = require("@supabase/supabase-js");
console.log("ENV:", import.meta.env)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;