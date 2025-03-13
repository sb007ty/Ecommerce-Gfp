import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.jsx";
// import StoreFront from "./components/storeFront/StoreFront.jsx";
// import ProductDetails from "./components/storeFront/productGrid/ProductDetails";
// import ReviewsSection from "./components/storeFront/reviews/ReviewsSection";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = lazy(() => import("./App.jsx"));
const StoreFront = lazy(() => import("./components/storeFront/StoreFront.jsx"));
const ProductDetails = lazy(
  () => import("./components/storeFront/productGrid/ProductDetails")
);
const ReviewsSection = lazy(
  () => import("./components/storeFront/reviews/ReviewsSection")
);
// import router from "./router.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <StoreFront />,
      },
      {
        path: "product-details/:productId",
        element: <ProductDetails />,
      },
      {
        path: "reviews/:productId",
        element: <ReviewsSection />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
