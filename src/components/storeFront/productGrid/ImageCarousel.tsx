const maxSmallImages = 2;
function ImageCarousel({
  activeSmallImg,
  setActiveSmallImg,
  mainImage,
  setMainImage,
  images,
  activeColor,
}) {
  const displayImages = images?.filter(
    (item) => item["color"] === activeColor
  )!;
  return (
    <div className="product-img-container">
      <figure>
        <img
          src={displayImages?.[mainImage]?.["image_url"]}
          alt="product-img"
          className="product-details-main-img"
          height={"400px"}
          width={"400px"}
        />
      </figure>
      <div className="small-product-images">
        {displayImages.length > maxSmallImages + 1 && (
          <button
            onClick={(e) => {
              if (activeSmallImg > 0) setActiveSmallImg(activeSmallImg - 1);
            }}
          >
            &lt;
          </button>
        )}
        {[
          ...displayImages.slice(0, mainImage),
          ...displayImages.slice(mainImage + 1),
        ].map((item, index) => {
          return (
            <figure
              key={item["image_url"]}
              style={{
                border: activeSmallImg === index ? "1px solid black" : "",
              }}
            >
              <img
                src={item["image_url"]}
                alt=""
                height={"100px"}
                width={"100px"}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  console.log(index, mainImage);
                  if (index < mainImage) setMainImage(index);
                  else {
                    setMainImage(index + 1);
                  }
                }}
              />
            </figure>
          );
        })}
        {displayImages.length > maxSmallImages + 1 && (
          <button
            onClick={(e) => {
              console.log(displayImages.length, activeSmallImg);
              if (activeSmallImg < displayImages.length - 2)
                setActiveSmallImg(activeSmallImg + 1);
            }}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default ImageCarousel;
