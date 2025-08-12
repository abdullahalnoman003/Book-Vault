import React from "react";
import { Link } from "react-router";
import { FaBookOpen, FaPlusCircle, FaArrowRight, FaBookReader } from "react-icons/fa";
import { motion } from "framer-motion";
import TrueFocus from "../../Animation/TrueFocus";

const Hero = () => {
  return (
    <div className="relative bg-base-100 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="flex flex-col space-y-6 max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-2">
              <span className="animate-pulse mr-2">✨</span> Your Personal Literary Journey
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-base-content">
              Discover and Track Your 
              <div className="mt-2">
                <span className="text-secondary">
                  Reading Adventures
                </span>
              </div>
            </h1>
            
            <div className="relative">
              <span className="text-primary text-3xl sm:text-4xl font-bold">
                <TrueFocus
                  sentence="Book Vault"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="primary"
                  animationDuration={2}
                  pauseBetweenAnimations={0.5}
                />
              </span>
            </div>
            
            <p className="text-lg text-base-content/70 leading-relaxed max-w-lg">
              Build your personal digital library, track your reading progress, discover new books, 
              and connect with a community of passionate readers.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/bookshelf">
                <motion.button 
                  className="btn btn-primary btn-lg gap-2 rounded-full shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaBookOpen className="text-lg" /> Explore Library
                  <FaArrowRight className="ml-1" />
                </motion.button>
              </Link>
              <Link to="/add-book">
                <motion.button 
                  className="btn btn-outline btn-accent btn-lg gap-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlusCircle className="text-lg" /> Add Book
                </motion.button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 pt-4 text-sm text-base-content/60">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center text-success">
                  <FaBookReader />
                </div>
                <span className="ml-2">10K+ Books</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-info/20 flex items-center justify-center text-info">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="ml-2">5K+ Members</span>
              </div>
            </div>
          </motion.div>
          
          {/* Image - Right Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://i.ibb.co/wF1HLPz6/pexels-ivo-rainha-527110-1290141.jpg" 
                alt="Book Vault Library" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent"></div>
              
              <motion.div 
                className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xl">📖</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Start Your Reading Journey</h3>
                    <p className="text-white/80 text-sm mt-1">Organize, track, and discover your next favorite book</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Floating badges */}
            <motion.div 
              className="absolute -right-6 top-24 bg-base-100 shadow-xl rounded-full px-4 py-2 flex items-center space-x-2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="font-semibold">4.9/5 Rating</span>
            </motion.div>
            
            <motion.div 
              className="absolute -left-6 bottom-32 bg-base-100 shadow-xl rounded-full px-4 py-2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <span className="font-semibold">Free Access to 1000+ Books</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
