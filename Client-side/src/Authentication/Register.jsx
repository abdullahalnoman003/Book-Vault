import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../Firebase/firebase.init";
import { motion } from "framer-motion";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const Register = () => {
  useDocumentTitle("Register | Book Vault")
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-base-200">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold  text-primary">
            Registration in progress <br />
            Please Wait...
          </p>
        </div>
      </div>
    );
  }

  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "🎉 Google Login Successful!",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Google login failed!",
          footer: `❌ ${error.message}`,
          timer: 2000,
        });
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          sendEmailVerification(user).then(() => {
            signOut(auth).then(() => {
              Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Verification email sent. Please verify before login.",
                showConfirmButton: false,
                timer: 3000,
              });
              e.target.reset();
              setLoading(false);
              setTimeout(() => navigate("/login"), 3000);
            });
          });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
          timer: 2000,
        });
        setLoading(false);
      });
  };

  return (
    <div
    
    className="min-h-screen flex py-25 justify-center items-center bg-base-400 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl backdrop-blur-md border-2 border-primary shadow-2xl rounded-2xl p-10"
      >
        <h1 className="text-4xl font-extrabold text-center mb-2 text-primary drop-shadow-md">
          📝 Join the Library
        </h1>
        <p className="text-center  text-lg  font-semibold mb-10">
          Sign up to start exploring, saving, and sharing your favorite reads.
        </p>

        <h3 className="text-base text-center font-bold">
          Please fill up the form!
        </h3>
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text  font-medium">Full Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="input input-bordered  w-full input-accent"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text  font-medium">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="someone@example.com"
              className="input input-bordered w-full input-accent"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">
              <span className="label-text  font-medium">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="https://your-photo-url.com"
              className="input input-bordered w-full input-accent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text   font-medium">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full input-accent"
              placeholder="Minimum 8 characters"
              required
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least 1 number, 1 uppercase and 1 lowercase letter, and at least 8 characters"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-primary w-full text-lg"
          >
            Register
          </motion.button>

          <div className="divider font-bold">OR</div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignin}
            type="button"
            className="btn btn-outline w-full text-base font-semibold"
          >
            <FcGoogle size={22} />
            Sign Up with Google
          </motion.button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className=" font-bold hover:underline hover:text-secondary duration-300"
            >
              Login here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
