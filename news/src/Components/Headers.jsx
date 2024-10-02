import { useState } from "react";
import logo from "../assets/logo.png";
import Close from "./Close";
import Bars from "./Bars";
import NavbarList from "./NavbarList";
import { NavLink } from "react-router-dom";

const Headers = () => {
  const [closeNavbar, setCloseNavbar] = useState(false);

  const toggleNavbar = () => {
    setCloseNavbar((prevState) => (prevState == false ? true : false));
  };

  return (
    <div className=" p-5 shadow-2xl">
      <div className="flex justify-between items-center">
        {/* logo */}
        <div className="">
          {/* icons */}
          <div className="ps-8">
            <NavLink to="/">
              <img src={logo} className="h-16" alt="oops" />
            </NavLink>
          </div>
        </div>

        {/* Navigations */}
        <div className="lg:pe-40 md:pe-5">
          <div className="md:hidden">
            {closeNavbar ? (
              <Close toggleNavbar={toggleNavbar} />
            ) : (
              <Bars toggleNavbar={toggleNavbar} />
            )}
          </div>
          <div className="hidden md:block">
            <NavbarList />
          </div>
        </div>
      </div>

      {/*  */}
      <div className="md:hidden">{closeNavbar ? <NavbarList /> : null}</div>
    </div>
  );
};

export default Headers;
