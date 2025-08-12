import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { TfiBook } from "react-icons/tfi";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const context = useContext(AuthContext);
  const { user, logout } = context || {};

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logout();
          Swal.fire({
            title: "Logged out!",
            text: "You have successfully logged out.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: `Logout failed: ${error.message}`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="navbar  backdrop-blur-xl  shadow-lg fixed top-0 z-50 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost mr-0 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/" className="font-bold pb-2">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookshelf" className="font-bold pb-2">
                Bookshelf
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/add-book" className="font-bold pb-2">
                    Add Book
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-books" className="font-bold pb-2">
                    My Books
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="font-bold pb-2">
                    My Profile
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/about-us" className="font-bold pb-2">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        <Link
          to="/"
          className="min-md:ml-4 bg-transparent border-0 flex gap-1 items-center max-md:text-base max-md:pr-3 max-md:pl-1 rounded-lg font-extrabold  text-2xl"
        >
          <TfiBook className="text-primary" />
          <span className="text-primary ">Book</span>
          <span className="text-secondary font-extrabold">Vault</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1  flex gap-3">
          <li>
            <NavLink to="/" className="font-bold text-md">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookshelf" className="font-bold text-md">
              Bookshelf
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/add-book" className="font-bold text-md">
                  Add Book
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-books" className="font-bold text-md">
                  My Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="font-bold text-md">
                  My Profile
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/about-us" className="font-bold text-md">
              About Us
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <ThemeToggle />

        {!user ? (
          <ul className="ml-3 flex gap-3">
            <li>
              <NavLink
                to="/login"
                className="font-bold text-md max-md:text-sm max-md:p-1"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className="font-bold text-md max-md:text-sm max-md:p-1"
              >
                Register
              </NavLink>
            </li>
          </ul>
        ) : (
          <>
            <div className="dropdown dropdown-end ml-3">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip tooltip-left mr-4"
                data-tip={user.displayName || "User"}
              >
                <div className="w-10 border-primary border rounded-full">
                  <img src={user.photoURL} alt="User" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 font-bold btn"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
