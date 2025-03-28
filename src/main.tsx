import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.jsx";
// import StoreFront from "./components/storeFront/StoreFront.jsx";
// import ProductDetails from "./components/storeFront/productGrid/ProductDetails";
// import ReviewsSection from "./components/storeFront/reviews/ReviewsSection";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryComp from "./components/common/ErrorBoundaryComp";

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
    <ErrorBoundary FallbackComponent={ErrorBoundaryComp}>
      <Provider store={store}>
        <Suspense fallback="Page Loading...">
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
