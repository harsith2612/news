import { NavLink } from "react-router-dom";

const NavbarList = () => {
  const navBarList = [
    { name: "Entertainment", link: "/category/Entertainment" },
    { name: "Food", link: "/category/Food" },
    { name: "Sports", link: "/category/Sports" },
    { name: "Custom", link: "/custom" },
  ];

  return (
    <div className="flex flex-col mt-5  space-y-5 md:flex-row md:mt-0 md:space-y-0 md:space-x-16 lg:space-x-40">
      {navBarList.map(({ name, link }) => (
        <div key={name} className="space-y-3 flex justify-center">
          <NavLink
            to={link}
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-sky-500" : ""}`
            } // Highlights the active link
          >
            {name}
          </NavLink>
          <hr className="md:hidden" />
        </div>
      ))}
    </div>
  );
};

export default NavbarList;
