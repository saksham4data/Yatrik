require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("❌ Missing credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing Supabase connection...");
  try {
    // Attempting to select from the buses table
    const { data, error } = await supabase.from('buses').select('*').limit(1);
    if (error) {
      console.error("❌ Supabase connection failed or table does not exist!");
      console.error(error.message);
    } else {
      console.log("✅ Supabase connection successful! 'buses' table is accessible.");
    }
  } catch (err) {
    console.error("❌ Unexpected error connecting to Supabase:", err);
  }
}

testConnection();
