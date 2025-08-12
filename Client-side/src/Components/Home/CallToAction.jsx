import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";

const CallToAction = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-focus z-0">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-8 border-white"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full border-8 border-white"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white"></div>
          <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border-4 border-white"></div>
        </div>
      </div>

      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-white space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium backdrop-blur-sm mb-2">
                <span className="animate-ping absolute h-2 w-2 rounded-full bg-white opacity-75"></span>
                <span className="relative rounded-full h-3 w-3 bg-white mr-2"></span>
                Start Your Reading Journey
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Ready to Transform Your Reading Experience?
              </h2>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                Organize your collection, track your reading progress, discover new titles, and connect with fellow book lovers.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/my-books">
                  <motion.button 
                    className="btn btn-lg bg-white hover:bg-white/90 text-primary border-none rounded-full px-8 font-bold group flex items-center"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link to="/bookshelf">
                  <motion.button 
                    className="btn btn-lg btn-outline border-white text-white hover:bg-white/20 hover:border-white rounded-full px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaBookOpen className="mr-2" /> Explore Library
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="hidden md:block relative"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-24 h-32 bg-white/10 backdrop-blur-md rounded-lg shadow-xl transform rotate-12"></div>
                <div className="absolute -top-5 -left-5 w-24 h-32 bg-white/20 backdrop-blur-md rounded-lg shadow-xl transform rotate-6"></div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <span className="text-primary text-xl">📚</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">BookVault</h3>
                      <p className="text-white/70 text-sm">Your personal library</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 bg-white/30 rounded-full w-full"></div>
                    <div className="h-3 bg-white/30 rounded-full w-5/6"></div>
                    <div className="h-3 bg-white/30 rounded-full w-4/6"></div>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-accent"></div>
                      <div className="w-8 h-8 rounded-full bg-secondary"></div>
                      <div className="w-8 h-8 rounded-full bg-info"></div>
                    </div>
                    <div className="w-20 h-8 bg-white/20 rounded-full"></div>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white text-lg">🌟</span>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5"></div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-20 h-28 bg-white/10 backdrop-blur-md rounded-lg shadow-xl transform -rotate-12"></div>
                <div className="absolute -bottom-4 -right-4 w-20 h-28 bg-white/15 backdrop-blur-md rounded-lg shadow-xl transform -rotate-6"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
