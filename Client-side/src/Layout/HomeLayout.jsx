import React from "react";
import Navbar from "../Components/Nav+Footer/Navbar";
import Footer from "../Components/Nav+Footer/Footer";
import { Outlet } from "react-router";
import { Helmet } from "react-helmet-async";

const HomeLayout = () => {
  return (
    <>
      <Helmet>
        <title>Welcome to Book Vault</title>
      </Helmet>
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
