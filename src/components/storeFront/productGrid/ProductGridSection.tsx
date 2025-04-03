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
import ProductFilter from "../../shopall/ProductFilter";
import { useState } from "react";
const ProductGridSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams, "searchParams*");
  let apiEndpoint = "";
  let showHelpers = false;
  const [filter, setFilter] = useState<CategoryFilterType>({
    unisex: false,
    women: false,
    men: false,
  });
  const [collection, setCollection] = useState<CheckboxStateType>({
    latest: false,
    urban: false,
    cozy: false,
    fresh: false,
  });
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

  const applyCategory = (filterId: string, checked: boolean) => {
    const newUrlSearch = new URLSearchParams(searchParams.toString());
    newUrlSearch.set("page", "1");
    newUrlSearch.delete("category");
    const newFilter = { ...filter, [filterId]: checked };
    setFilter(newFilter);
    for (let i in newFilter) {
      if (Object.hasOwn(newFilter, i)) {
        if (newFilter[i]) newUrlSearch.append("category", i);
      }
    }
    setSearchParams(newUrlSearch);
  };

  const applyCollections = (colId, checked) => {};

  return (
    <div className="product-grid-container">
      {showHelpers && <SortDropdown applySort={applySort} />}
      <div className="flex">
        {showHelpers && (
          <ProductFilter
            filter={filter}
            // setFilter={setFilter}
            applyCategory={applyCategory}
          />
        )}
        <div className="product-grid grow">
          {(isLoading || !data) && <Loading />}
          {error && <ApiErrorComp />}
          {data &&
            !isLoading &&
            !error &&
            products?.map((item) => {
              return <Product key={item["product_id"]} product={item} />;
            })}
        </div>
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
