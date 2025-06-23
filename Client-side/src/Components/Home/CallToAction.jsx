import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <div className="mb-[-15px] py-20 bg-primary text-neutral text-center ">
      <motion.div
        className="max-w-2xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold">
          Ready to Organize Your Bookshelf?
        </h2>
        <p className="text-lg">
          Start adding your books, writing reviews, and building your reading vault today!
        </p>
        <Link to="/my-books">
          <button className="btn btn-accent text-white px-8 text-lg">
            Get Started
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default CallToAction;
