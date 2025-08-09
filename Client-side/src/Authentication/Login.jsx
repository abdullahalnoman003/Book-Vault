import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { auth } from "../Firebase/firebase.init";
import { motion } from "framer-motion";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const Login = () => {
  useDocumentTitle("Login | Book Vault")
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200">
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg text-center space-y-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary">
            Login in progress
            <span className="loading loading-dots loading-sm ml-2"></span>
          </p>
        </div>
      </div>
    );
  }

  const handleGoogleSignin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Google login failed!",
          footer: error.message,
          timer: 2000,
        });
        setLoading(false);
      });
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    sessionStorage.setItem("resetEmail", email);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user.emailVerified) {
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            showConfirmButton: false,
            timer: 2000,
          });
          setLoading(false);
          navigate(from, { replace: true });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Email Not Verified!",
            text: "Please verify your email before logging in.",
            showConfirmButton: false,
            timer: 3000,
          });
          auth.signOut();
          setLoading(false);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: error.message,
          timer: 2000,
        });
        setLoading(false);
      });
  };

  return (
    <motion.div
    style={{
                backgroundImage: `url(https://i.postimg.cc/4dJCP098/pexels-pixabay-235985.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover", 
                backgroundPosition: "center",
              }}
      className="min-h-screen flex py-25 justify-center items-center bg-base-400 px-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="grid md:grid-cols-2 shadow-2xl rounded-3xl border border-primary/20 max-w-4xl w-full overflow-hidden backdrop-blur-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <motion.div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage: "url(https://i.ibb.co/zTb6vNGW/Bid6-min.png)",
            minHeight: "100%",
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        ></motion.div>

        <motion.div
          className="p-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-center mb-2 text-secondary drop-shadow-md">
            🔐 Welcome Back!
          </h1>
          <p className="text-center text-black text-lg mb-10">
            Login to access your personalized library and manage your favorite
            books.
          </p>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="form-control">
              <label className="label font-medium text-black">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-medium text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="text-sm mt-1 text-right">
                <Link
                  to="/forgot-password"
                  className="text-secondary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary w-full  font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            <div className="divider text-sm">OR</div>

            <motion.button
              type="button"
              onClick={handleGoogleSignin}
              className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-accent-content text-black hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FcGoogle size={22} />
              Continue with Google
            </motion.button>

            <p className="text-center text-sm">
              Don’t have an account?
              <Link
                to="/register"
                className="text-secondary font-semibold hover:text-accent-content ml-1"
              >
                Register
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
