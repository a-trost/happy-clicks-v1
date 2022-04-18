import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
const supabasePublicKey =
  import.meta.env.SUPABASE_PUBLIC_KEY || process.env.SUPABASE_PUBLIC_KEY;

const supabase = createClient(supabaseURL, supabasePublicKey);

let cachedSupabaseLikes;

export async function getAllLikes() {
  if (cachedSupabaseLikes) {
    return cachedSupabaseLikes;
  }

  const { data, error } = await supabase.from("Likes").select("post_uid");

  const likes = countLikes(data);
  return likes;
}

getAllLikes();

function countLikes(data) {
  const likes = {};
  data.forEach(({ post_uid }) => {
    if (!likes[post_uid]) {
      likes[post_uid] = 1;
    } else {
      likes[post_uid]++;
    }
  });
  return likes;
}
