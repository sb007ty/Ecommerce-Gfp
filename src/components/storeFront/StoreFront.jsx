import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import ProductGridSection from "./productGrid/ProductGridSection";

function StoreFront() {
  const navigate = useNavigate();
  return (
    <div className="store-front">
      <HeroSection />
      {/* hello */}
      <div className="text-end m-3 ">
        <button
          className="border rounded-[5px] p-2"
          onClick={() => {
            const urlSearchParams = new URLSearchParams({ page: 1 });
            navigate(`/shopall?${urlSearchParams.toString()}`);
          }}
        >
          View All
        </button>
      </div>

      <ProductGridSection />
    </div>
  );
}

export default StoreFront;
