import axios from "axios";
export const fetchProductDetailsFromId = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};
export const fetchProductReviews = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};
