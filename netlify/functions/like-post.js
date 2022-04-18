// import { createClient } from "@supabase/supabase-js";
const Supabase = require("@supabase/supabase-js");

const supabaseURL = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
const supabasePublicKey =
  import.meta.env.SUPABASE_PUBLIC_KEY || process.env.SUPABASE_PUBLIC_KEY;

const sb = createClient(supabaseURL, supabasePublicKey);

exports.handler = async (event, context) => {
  const uid = event.queryStringParameters.uid;

  if (uid) {
    const { data, error } = await sb.from("Likes").insert([{ post_uid: uid }]);
  }
  return {
    statusCode: 200,
  };
};
