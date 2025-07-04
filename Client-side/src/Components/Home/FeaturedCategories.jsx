import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaBookOpen } from "react-icons/fa6";
import { motion } from "framer-motion";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://book-vault-server-six.vercel.app/categories-summary")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load Categories!",
          footer: error.message,
          timer: 2000,
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-10">
        <span className=" loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 my-16">
      <h2 className="text-3xl font-bold text-center text-primary mb-4">
        📚 Featured Book Categories
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Explore our popular book categories curated by our users.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <motion.div
            key={cat.category}
            data-aos="zoom-in-up"
            whileHover={{
              y: -10,
              color: "#ffffff",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="group hover:bg-primary hover:border-white border-3 border-primary rounded-2xl shadow-2xl p-6 text-center"
          >
            <div className="flex justify-center items-center mb-4 text-primary group-hover:text-white">
              <FaBookOpen className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold capitalize">{cat.category}</h3>
            <p className="mt-2 text-sm">
              {cat.count} {cat.count === 1 ? "book" : "books"} available
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
