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
      <div className="flex items-center justify-center my-16">
        <div className="text-center space-y-3">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/70">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-base-200/50 to-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Book Categories
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Explore our popular book categories curated by our community of readers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className=" shadow-primary  backdrop-blur-sm group hover:bg-gradient-to-br hover:from-primary hover:to-secondary rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-white/20 flex justify-center items-center mx-auto mb-4 transition-all duration-300">
                    <FaBookOpen className="text-2xl text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold capitalize text-base-content group-hover:text-white mb-2">{cat.category}</h3>
                </div>
                
                <div className="mt-4">
                  <p className="mt-2 text-sm text-base-content/70 group-hover:text-white/80">
                    <span className="font-bold text-base-content group-hover:text-white">{cat.count}</span> {cat.count === 1 ? "book" : "books"} available
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
