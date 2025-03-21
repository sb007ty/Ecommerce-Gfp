import { useState } from "react";
import "./App.css";
import NavBar from "./components/navigation/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ErrorBoundary fallback={"Error loading Navigation"}>
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
