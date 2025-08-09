import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import NotFound from "../Components/Error/NotFound";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Privacy from "../Components/T&C/Privacy";
import Terms from "../Components/T&C/Terms";
import ForgotPassword from "../Authentication/ForgotPassword";
import BookShelf from "../Components/Books/BookShelf";
import AddBooks from "../Components/Books/AddBooks";
import MyBooks from "../Components/Books/MyBooks";
import PrivateRoute from "../Authentication/PrivateRoute";
import Hero from "../Components/Home/Hero";
import Features from "../Components/Home/Features";
import CallToAction from "../Components/Home/CallToAction";
import PublicRoute from "../Authentication/PublicRoute";
import Profile from "../Authentication/Profile";
import BookDetails from "../Components/Books/BookDetails";
import Slider from "../Components/Home/Slider";
import UpdateBook from "../Components/Books/UpdateBook";
import HomeBooks from "../Components/Books/HomeBooks";
import FeaturedCategories from "../Components/Home/FeaturedCategories";
import AboutUs from "../Components/T&C/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        element: (
          <>
            <Hero></Hero>
            <Features></Features>
            <Slider></Slider>
            <HomeBooks></HomeBooks>
            <FeaturedCategories></FeaturedCategories>
            <CallToAction></CallToAction>
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login></Login>
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register></Register>
          </PublicRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            {" "}
            <Profile></Profile>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/bookshelf",
        element: <BookShelf></BookShelf>,
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBooks></AddBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-books",
        element: (
          <PrivateRoute>
            <MyBooks></MyBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/book-details/:id",
        element: <BookDetails></BookDetails>,
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            {" "}
            <UpdateBook></UpdateBook>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/privacy",
        element: <Privacy></Privacy>,
      },
      {
        path: "/terms",
        element: <Terms></Terms>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);
export default router;
