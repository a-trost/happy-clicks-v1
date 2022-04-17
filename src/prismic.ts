import * as prismic from "@prismicio/client";
import { getAllLikes } from "./supabase";
import capitalize from "lodash/capitalize.js";
import slugify from "slugify";

const API_ENDPOINT = "https://amazing-interactions.prismic.io/api/v2";
const client = prismic.createClient(API_ENDPOINT);

let cachedPrismicPosts, cachedPrismicPages;

export async function getAllPosts() {
  if (cachedPrismicPosts) {
    return cachedPrismicPosts;
  }

  const likes = await getAllLikes();

  const posts = await client
    .getAllByType("post", {
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
      pageSize: 100,
    })
    .then((res) => {
      return res.map((post) => {
        return {
          ...post.data,
          tags: post.tags,
          uid: post.uid,
          likeCount: likes[post.uid] || 0,
        };
      });
    });

  const tags = {};
  /*
    {
      'hover-effects': {
        count: 1,
        slug: 'hover-effects',
        posts: [{
          ...
        }]
      }
    }
  */

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tags[tag]) {
        tags[tag] = {
          name: capitalize(tag),
          count: 1,
          posts: [post],
          uid: slugify(tag),
        };
      } else {
        tags[tag].count++;
        tags[tag].posts.push(post);
      }
    });
  });

  cachedPrismicPosts = { posts, tags };

  return cachedPrismicPosts;
}

export async function getAllPages() {
  if (cachedPrismicPages) {
    return cachedPrismicPages;
  }

  const pages = await client.getAllByType("page").then((res) => res.results);

  cachedPrismicPages = { pages };
  return cachedPrismicPages;
}

export const linkResolver = function (doc) {
  // Pretty URLs for known types
  if (doc.type === "post") return "/post/" + doc.uid;
  if (doc.type === "page") return "/" + doc.uid;
  // Fallback for other types, in case new custom types get created
  return "/" + doc.uid;
};
