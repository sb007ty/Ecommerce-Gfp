import { useSelector } from "react-redux";
import { data, useLocation, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/redux-hook";
import useSWRImmutable from "swr/immutable";
import axios from "axios";
import { fetchProductDetailsFromId } from "../../../swr/fetchers";
import ApiErrorComp from "../../common/ApiErrorComp";
import Loading from "../../common/Loading";
import { useEffect, useState } from "react";
import { ProductDetailsInterface } from "../../../allTypes.type";
import Rating from "./Rating";
import { updateProductCart } from "../../../redux/slices/productSlice";
import "../../../styles/product-details.css";
import ImageCarousel from "./ImageCarousel";
const maxSmallImages = 2;
function ProductDetails() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { productId: productIdFromParams } = useParams();

  const productId =
    useAppSelector((state) => state.product.productDetails.id) ||
    productIdFromParams;
  const {
    data: productDetails,
    isLoading,
    error,
  } = useSWRImmutable<ProductDetailsInterface>(
    `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}`,
    fetchProductDetailsFromId
  );

  const {
    product_id,
    name,
    description,
    category,
    collection,
    created_at,
    colors,
    images,
    info,
    inventory,
    priceRange,
    rating,
    reviews,
    sizes,
    sold,
  } = productDetails || {};
  useEffect(() => {
    setActiveColor(colors?.[0]);
  }, [productDetails]);
  const [activeColor, setActiveColor] = useState<string | undefined>("");
  const [mainImage, setMainImage] = useState(0);
  const [activeSmallImg, setActiveSmallImg] = useState(0);
  const [quantity, setQuantity] = useState(0);

  if (isLoading) return <Loading />;
  if ((!productDetails && !isLoading) || error) return <ApiErrorComp />;
  const inventoryDetails = inventory?.find(
    (item) => item["color"] === activeColor
  );
  // console.log(inventoryDetails, activeColor, inventory, colors);
  const { list_price, sale_price } = inventoryDetails || {};
  // console.log(list_price, sale_price, "list");
  const discount = `${((list_price! - sale_price!) / sale_price!) * 100}% OFF`;

  return (
    <div className="product-details">
      <ImageCarousel
        images={images}
        activeSmallImg={activeSmallImg}
        setActiveSmallImg={setActiveSmallImg}
        mainImage={mainImage}
        setMainImage={setMainImage}
        activeColor={activeColor}
      />

      <div className="product-details-meta-container">
        <div>{name}</div>
        <div>
          <span style={{ fontSize: "2rem" }}>{list_price}</span>
          <span
            style={{
              textDecoration: "line-through",
              fontSize: "1rem",
              color: "gray",
            }}
          >
            {sale_price}
          </span>
          <span style={{ color: "green" }}>{discount}</span>
        </div>
        <Rating rating={rating!} reviews={reviews!} />
        <div>{description}</div>
        <div className="color-section">
          <div>See all availaible colors</div>
          {colors?.map((item) => {
            return (
              <button
                style={{
                  height: "20px",
                  width: "20px",
                  border: "1px solid black",
                  borderRadius: "50%",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: item,
                  cursor: "pointer",
                }}
                key={item}
                onClick={(e) => {
                  setActiveColor(item);
                  setMainImage(0);
                  setActiveSmallImg(0);
                }}
              >
                {item === activeColor ? "✅" : null}
              </button>
            );
          })}
        </div>
        <div className="quantity-section">
          <div>Quantity</div>
          <div className="quantity-btns">
            <button
              onClick={(e) => {
                if (quantity >= 1) setQuantity(quantity - 1);
              }}
            >
              -
            </button>
            <button>{quantity}</button>
            <button onClick={(e) => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        <button
          onClick={(e) => {
            console.log("helo");
            dispatch(updateProductCart({ productDetails, quantity }));
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
