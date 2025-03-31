import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import "../../../styles/product-grid.css";
import axios from "axios";
import Loading from "../../common/Loading";
import ApiErrorComp from "../../common/ApiErrorComp";
import Product from "./Product";
import { ProductDetailsInterface } from "../../../allTypes.type";
import { useSearchParams } from "react-router-dom";
import PaginationBar from "../../shopall/PaginationBar";
import SortDropdown from "../../shopall/SortDropdown";
const ProductGridSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams, "searchParams*");
  let apiEndpoint = "";
  let showHelpers = false;
  if (searchParams.size === 0) {
    apiEndpoint =
      "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest";
  } else {
    apiEndpoint = `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?${searchParams.toString()}`;
    showHelpers = true;
  }

  const getProducts = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (ex) {
      console.log(ex, "error");
      throw new Error("Error loading products");
    }
  };

  const onPageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
  };

  const { data, isLoading, error, isValidating } = useSWRImmutable(
    apiEndpoint,
    getProducts
    // { keepPreviousData: true }
  );
  const products = data?.data;
  const pagination = data?.pagination;
  const { total, page, per_page, has_more } = pagination || {};
  console.log(
    products,
    "products*",
    isLoading,
    searchParams.toString(),
    isValidating
  );
  const applySort = (sort: string) => {
    const newUrlSearchParams = new URLSearchParams(searchParams.toString());
    newUrlSearchParams.set("page", "1");
    if (sort === "sortby") {
      newUrlSearchParams.delete("sort");
    } else newUrlSearchParams.set("sort", sort);
    setSearchParams(newUrlSearchParams);
  };

  return (
    <div className="product-grid-container">
      {showHelpers && <SortDropdown applySort={applySort} />}

      <div className="product-grid">
        {(isLoading || !data) && <Loading />}
        {error && <ApiErrorComp />}
        {data &&
          !isLoading &&
          !error &&
          products?.map((item) => {
            return <Product key={item["product_id"]} product={item} />;
          })}
      </div>
      {showHelpers && (
        <PaginationBar
          onPageChange={onPageChange}
          total={total}
          per_page={per_page}
        />
      )}
    </div>
  );
};

export default ProductGridSection;
