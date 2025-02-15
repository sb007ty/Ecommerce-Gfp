import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/navigation/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import StoreFront from "./components/storeFront/StoreFront";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <NavBar />

      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
