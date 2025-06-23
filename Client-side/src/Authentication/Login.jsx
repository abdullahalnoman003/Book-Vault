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

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-base-200">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold  text-yellow-800">
            Login in progress <br />
            Please Wait...
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
      className="min-h-screen flex my-25 justify-center items-center py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="grid md:grid-cols-2 shadow-xl rounded-3xl border border-primary max-w-4xl w-full overflow-hidden"
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
          <h2 className="text-3xl font-bold text-center text-secondary mb-6">
            Welcome Back! <br />
            <span className="text-2xl">Login to Your Account</span>
          </h2>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="form-control">
              <label className="label font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">Password</label>
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
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            <div className="divider text-sm">OR</div>

            <motion.button
              type="button"
              onClick={handleGoogleSignin}
              className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-slate-600 hover:text-white"
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
                className="text-blue-600 font-semibold hover:text-pink-500 ml-1"
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
