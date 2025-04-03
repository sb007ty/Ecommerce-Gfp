import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/navigation/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryComp from "./components/common/ErrorBoundaryComp";

function App() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorBoundaryComp}>
        <NavBar />
      </ErrorBoundary>

      <hr />
      <Outlet />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
