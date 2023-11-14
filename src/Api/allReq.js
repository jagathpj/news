import axios from "axios";
import { base } from "./base";

export const fetchNews = async () => {
  let response = await axios.get(base);
  return response;
};

export const fetchNextPage = async (pageId) => {
  let response = await axios.get(`${base}&page=${pageId}`);
  return response;
};

export const fetchCategory = async (category) => {
  let response = await axios.get(`${base}&category=${category}`);
  return response;
};

export const fetchSearchResults = async (searchterm) => {
  let response = await axios.get(`${base}&q=${searchterm}`);
  return response;
};
