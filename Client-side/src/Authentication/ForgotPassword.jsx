import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const ForgotPassword = () => {
  useDocumentTitle("Reset Password | Book Vault");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Link Sent",
          text: "Password Link has been sent to your email!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Go to Gmail!",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "https://mail.google.com";
          }
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <motion.div
      className="min-h-screen  flex items-center justify-center px-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-2xl  shadow-2xl border border-primary rounded-2xl p-8 bg-base-100"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
      >
        <motion.h2
          className="text-2xl font-bold text-center text-secondary mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl max-md:text-2xl font-extrabold text-center mb-2 text-primary drop-shadow-md">
            🔁 Reset Your Password
          </h1>
          <p className="text-center text-lg text-base-content mb-10">
            Don’t worry! We’ll help you recover access to your account quickly.
          </p>
        </motion.h2>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              placeholder="your@email.com"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            className="btn btn-primary w-full mt-2"
          >
            Reset Password
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;
