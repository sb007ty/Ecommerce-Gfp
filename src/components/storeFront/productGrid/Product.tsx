import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProductDetailsId } from "../../../redux/slices/productSlice";
import { useAppDispatch } from "../../../redux/redux-hook";

function Product({ product }: { product: any }) {
  //   console.log(product, "prod*");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { images, name, product_id } = product;
  const uniqueColors = new Map();
  images.forEach((item) => {
    if (!uniqueColors.has(item["color"]))
      uniqueColors.set(item["color"], item["image_url"]);
  });
  const uniqueColorsArr = Array.from(uniqueColors);
  const [activeColor, setActiveColor] = useState(uniqueColorsArr[0][0]);

  const imgToDisplay = uniqueColorsArr.find(
    (item) => item[0] === activeColor
  )![1];
  console.log(activeColor, "act", uniqueColorsArr, imgToDisplay);
  //   console.log(uniqueColors, "un****");
  const goToProductDetails = () => {
    dispatch(updateProductDetailsId(product_id));
    navigate(`/product-details/${product_id}`);
  };

  return (
    <div className="product">
      <div className="img-container" onClick={goToProductDetails}>
        <img
          className="product-img"
          src={imgToDisplay}
          alt="product-img"
          height={"300px"}
          width={"200px"}
          loading="lazy"
        />
      </div>
      <div>{name}</div>

      <div className="color-container">
        {uniqueColorsArr.map(([key, val], index) => {
          //   console.log(key, val, "item***");
          return (
            <button
              style={{
                height: "20px",
                width: "20px",
                border: "1px solid black",
                borderRadius: "50%",
                backgroundColor: key,
                cursor: "pointer",
              }}
              key={key}
              onClick={(e) => {
                setActiveColor(key);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Product;
