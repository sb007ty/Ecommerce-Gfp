import { NavLink } from "react-router-dom";
import stylenest from "../../assets/images/stylenest.svg";
import "../../styles/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faCross,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
function NavBar() {
  const [hideNavMenu, setHideNavMenu] = useState(true);
  function resizeWindow() {
    const windowWidth = window.innerWidth;
    // console.log(typeof windowWidth);
    if (windowWidth > 768) setHideNavMenu(true);
  }
  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  function clickHamMenu() {
    setHideNavMenu((hideNavMenu) => !hideNavMenu);
  }
  return (
    <div className="nav-bar ">
      <div className={"nav-menu" + (hideNavMenu ? " nav-menu-hidden" : "")}>
        <div className="nav-menu-image-div">
          <div className={"image-nav-menu"}>
            <img src={stylenest} alt="" />
          </div>
          <FontAwesomeIcon icon={faX} onClick={() => setHideNavMenu(true)} />
        </div>

        <NavLink className={"shop-all-nav-menu"} to={"/shopall?page=1"}>
          Shop All
        </NavLink>
        <NavLink className={"latest-arrival-nav-menu"}>Latest Arrival</NavLink>
      </div>
      <div className="nav-img">
        <img src={stylenest} alt="" />
      </div>
      <NavLink className={"shop-all"} to={"/shopall?page=1"}>
        Shop All
      </NavLink>
      <NavLink className={"latest-arrival"}>Latest Arrival</NavLink>
      <NavLink className={"nav-cart"} to={"/checkout"}>
        <FontAwesomeIcon icon={faCartShopping} />
      </NavLink>
      <FontAwesomeIcon
        icon={faBars}
        className="hamburger-menu"
        onClick={clickHamMenu}
      />
    </div>
  );
}

export default NavBar;
