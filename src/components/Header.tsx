import { useState } from "react";
import Logo from "/assets/images/main-logo.png";
import { Link, NavLink } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      id: 1,
      icons: "fa-solid fa-table-columns",
      label: "Dashboard",
      path: "/",
    },
    {
      id: 2,
      icons: "fa-solid fa-newspaper",
      label: "Journal",
      path: "/journal",
    },
    {
      id: 3,
      icons: "fa-solid fa-face-smile",
      label: "Mood Tracker",
      path: "/mood-tracker",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-5">
      <div className="container mx-auto px-3">
        {/* Main header container with logo and menu */}
        <div className="flex justify-between items-center relative">
          {/* Logo with accessible alt text */}
          <Link to="/">
            <div className="w-[150px] h-fit">
              <img
                src={Logo}
                alt="Mental Wellness Journal Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Mobile menu toggle button */}
          <div className="md:hidden">
            <button
              className="text-black focus:outline-none"
              onClick={toggleMenu}>
              {isMenuOpen ? (
                <i className="fa-solid fa-xmark text-lg"></i>
              ) : (
                <i className="fa-solid fa-bars text-lg"></i>
              )}
            </button>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex md:flex-row md:gap-5">
            <ul className="flex items-center gap-5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  {/* Using NavLink to automatically apply an 'active' class */}
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 font-medium px-3 py-2 rounded-sm md:text-sm ${
                        isActive ? "text-[#6780FF]" : "hover:text-[#6780FF]"
                      }`
                    }>
                    <i className={`${link.icons} text-lg`}></i>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation - Conditionally rendered */}
        <nav
          className={`absolute left-0 bg-white list-none w-full
            transform transition-all duration-400 ease-in-out overflow-hidden z-2
            ${isMenuOpen ? "py-3" : "py-0"}
            `}
          style={{
            maxHeight: isMenuOpen ? "500px" : "0",
          }}>
          <ul className="w-full">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `flex justify-center items-center w-full py-3 gap-2 rounded-sm text-sm font-medium ${
                      isActive ? "text-[#6780FF]" : " hover:text-[#6780FF]"
                    }`
                  }>
                  <i className={`${link.icons} text-md`}></i>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
