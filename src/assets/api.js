import axios from "axios";
import { memoize } from "./util";

const API_BASE = process.env.VUE_APP_API_BASE || "http://localhost:1337/";

export const apiUrl = (path) => API_BASE + path.replace(/^\//, "");

export const get = async (endpoint, params) =>
  (await axios.get(apiUrl(endpoint), { params })).data;

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
