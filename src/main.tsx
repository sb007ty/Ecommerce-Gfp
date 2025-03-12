import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StoreFront from "./components/storeFront/StoreFront.jsx";
import ProductDetails from "./components/storeFront/productGrid/ProductDetails";
import { Provider } from "react-redux";
import store from "./redux/store";
import ReviewsSection from "./components/storeFront/reviews/ReviewsSection";
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
        path: "product-details/*",
        element: <ProductDetails />,
      },
      {
        path: "reviews/*",
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
