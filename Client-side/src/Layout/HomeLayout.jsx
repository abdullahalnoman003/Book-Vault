import React from "react";
import Navbar from "../Components/Nav+Footer/Navbar";
import Footer from "../Components/Nav+Footer/Footer";
import { Outlet } from "react-router";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const HomeLayout = () => {
  useDocumentTitle("Welcome to Book Vault")
  return (
    <>

      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default HomeLayout;
