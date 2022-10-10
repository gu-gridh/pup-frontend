import axios from "axios";
import { memoize } from "./util";

const API_BASE = process.env.VUE_APP_API_BASE || "http://localhost:1337/";

export const apiUrl = (path) => API_BASE + path.replace(/^\//, "");

export const get = async (endpoint, params) =>
  (await axios.get(apiUrl(endpoint), { params })).data;

export const getVenue = memoize(async () => get("venue"));

export const getJournals = memoize(async () => get("journals"));

export const getLatestJournal = memoize(
  async () =>
    (await get(`journals`, { _sort: "published_at:DESC", _limit: 1 }))[0]
);

export const getJournal = memoize(
  async (identifier) => (await get("journals", { identifier }))[0]
);

export const getArticles = memoize((params) => get("articles", params));

export const getArticle = async (identifier, revision) =>
  (await getArticles({ identifier, revision }))[0];

/**
 * In a Strapi image field value, find the smallest format that covers the given dimensions.
 */
export const getImageAtLeast = (imageValue, width, height = 0) => {
  // Really small originals have no formats.
  if (!imageValue.formats) return imageValue;
  // Find the smallest format that exceeds given dimensions.
  const format = ["thumbnail", "small", "medium", "large"].find(
    (format) =>
      imageValue.formats[format] &&
      imageValue.formats[format].width >= width &&
      imageValue.formats[format].height >= height
  );
  // No format big enough, fallback to the original.
  return imageValue.formats[format] || imageValue;
};
