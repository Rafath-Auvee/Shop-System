import axios from "../../utils/axios.config.js";

export const fetchProducts = async () => {
  const response = await axios.get("/products");
  console.log(response.data.data);
  const data = response.data.data
  return data;
};

