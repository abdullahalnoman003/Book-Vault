import React from "react";
import { FaBookmark, FaPenFancy, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="py-14 text-center bg-base-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        What can you do in <span className="text-primary">Book</span>
        <span className="text-secondary">Vault</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto px-4">
        <motion.div
          className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <FaBookmark className="text-3xl text-primary mb-3 mx-auto" />
          <h3 className="font-semibold text-lg">Track Progress</h3>
          <p className="text-sm text-gray-600">
            Update your reading and never lose your place.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <FaPenFancy className="text-3xl text-secondary mb-3 mx-auto" />
          <h3 className="font-semibold text-lg">Write Reviews</h3>
          <p className="text-sm text-gray-600">
            Help others by sharing your book opinions.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FaChartLine className="text-3xl text-yellow-500 mb-3 mx-auto" />
          <h3 className="font-semibold text-lg">Dashboard</h3>
          <p className="text-sm text-gray-600">
            See your book stats and reading activity.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
