import React, { useState, useRef, useContext } from "react";
import useOnClickOutside from "../hooks/useOutsideClick";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

function Header(props) {
  let [dropdownActive, setDropdownActive] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setDropdownActive(false));
  let context = useContext(UserContext);

  function handleLogout() {
    context.setUser(null);
    localStorage.removeItem("token");
  }
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 container ">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <NavLink className="flex-shrink-0" to="/">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="logo"
              />
            </NavLink>

            {context.user ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="ml-3 relative">
                  <div>
                    <button
                      className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                      onClick={() => setDropdownActive(!dropdownActive)}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                  {dropdownActive && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                      ref={ref}
                    >
                      <Dropdown ref={ref} handleLogout={handleLogout} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:block sm:ml-6">
                <div className="flex">
                  {/* <NavLink
                  activeClassName="bg-gray-900"
                  exact
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white  focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  Home
                </NavLink> */}

                  <NavLink
                    activeclassName="bg-gray-900"
                    onClick={() => {
                      props.open();
                      props.setActiveModel("login");
                    }}
                    to="/"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    activeclassName="bg-gray-900"
                    onClick={() => {
                      props.open();
                      props.setActiveModel("signup");
                    }}
                    to="/"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Signup
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Dropdown({ handleLogout }) {
  return (
    <div
      className="py-1 rounded-md bg-white shadow-xs"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <a
        href="#"
        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        role="menuitem"
      >
        Your Profile
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        role="menuitem"
      >
        Settings
      </a>
      <NavLink
        to="/"
        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        role="menuitem"
        onClick={handleLogout}
      >
        Sign out
      </NavLink>
    </div>
  );
}
export default Header;
