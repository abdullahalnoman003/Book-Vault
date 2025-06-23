import React from "react";
import { Link } from "react-router";
import { FaBookOpen, FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import TrueFocus from "../../Animation/TrueFocus";

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-[556px] mt-20 max-h-screen rounded-b-2xl rounded-2xl bg-base"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/wF1HLPz6/pexels-ivo-rainha-527110-1290141.jpg)",
        }}
      >
        <div className="hero-overlay bg-black/70 rounded-2xl" />
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl space-y-6">
            <motion.h1
              className="text-5xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to{" "}
              <span className="text-primary">
                <TrueFocus
                  sentence="Book Vault"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="white"
                  animationDuration={2}
                  pauseBetweenAnimations={0.5}
                >
                </TrueFocus>
              </span>
            </motion.h1>
            <p className="text-lg">
              Organize your reads, track progress, write reviews, and build your
              digital bookshelf!
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/bookshelf">
                <button className="btn btn-primary gap-2">
                  <FaBookOpen /> Explore Books
                </button>
              </Link>
              <Link to="/add-book">
                <button className="btn btn-outline btn-secondary gap-2">
                  <FaPlusCircle /> Add a Book
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
