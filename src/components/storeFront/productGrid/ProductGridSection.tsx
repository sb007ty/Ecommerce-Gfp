import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import "../../../styles/product-grid.css";
import axios from "axios";
import Loading from "../../common/Loading";
import ApiErrorComp from "../../common/ApiErrorComp";
import Product from "./Product";
import { ProductResponse } from "../../../allTypes.type";
const ProductGridSection = () => {
  const getProducts = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (ex) {
      console.log(ex, "error");
      throw new Error("Error loading products");
    }
  };

  const { data, isLoading, error } = useSWRImmutable<ProductResponse>(
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest",
    getProducts
  );
  const products = data?.data;
  console.log(products, "products*");
  return (
    <div className="product-grid">
      {isLoading && <Loading />}
      {error && <ApiErrorComp />}
      {!isLoading &&
        !error &&
        products?.map((item) => {
          return <Product key={item["product_id"]} product={item} />;
        })}
    </div>
  );
};

export default ProductGridSection;
