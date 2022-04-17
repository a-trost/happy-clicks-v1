// import { createClient } from "@supabase/supabase-js";
const Supabase = require("@supabase/supabase-js");

const sb = Supabase.createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_PUBLIC_KEY
);

exports.handler = async (event, context) => {
  const uid = event.queryStringParameters.uid;

  if (uid) {
    const { data, error } = await sb.from("Likes").insert([{ post_uid: uid }]);
  }
  return {
    statusCode: 200,
  };
};
