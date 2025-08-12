import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import FuzzyText from "../../Animation/FuzzyText";
import { motion } from "framer-motion";

const HomeBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://book-vault-server-six.vercel.app/top-liked-books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load books!",
          footer: error.message,
          timer: 2000,
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-80 w-full flex items-center justify-center bg-base-200 rounded-xl mt-8">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-yellow-800">
            Fetching Top Books...
          </p>
        </div>
      </div>
    );
  }

  const topBooks = books.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12 relative">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent max-sm:block hidden">
          Trending Reads
        </h2>
        <div className="max-sm:hidden flex justify-center">
          <FuzzyText baseIntensity={0.1} hoverIntensity={0.25} enableHover={true}>
            Trending Reads
          </FuzzyText>
        </div>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Discover the most loved books by our community of passionate readers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {topBooks.map((book, index) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              y: -8,
            }}
            className="group shadow-primary relative bg-base-100 rounded-2xl shadow-md overflow-hidden hover:shadow-lg h-[500px] flex flex-col"
          >
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/80 text-white backdrop-blur-sm">
                {book.book_category}
              </span>
            </div>
            
            {/* Likes Badge */}
            <div 
              className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-pink-600 font-semibold"
              data-tooltip-id={`like-${book._id}`}
              data-tooltip-content="Readers loved this book"
            >
              <FaHeart className="text-sm" />
              <span>{book.upvote || 0}</span>
              <Tooltip id={`like-${book._id}`} place="top" />
            </div>

            {/* Cover Image with Overlay */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-70"></div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative">
              {/* Book Icon */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary absolute -top-6 right-6 border-4 border-base-100 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-base-content mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                {book.book_title}
              </h2>
              
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-base-content/70">
                  {book.book_author}
                </p>
              </div>

              <div className="mt-auto pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/book-details/${book._id}`)}
                  className="w-full btn btn-primary rounded-xl shadow-md group-hover:shadow-lg transition-all"
                  data-tooltip-id={`details-${book._id}`}
                  data-tooltip-content="View complete details"
                >
                  View Details
                </motion.button>
                <Tooltip id={`details-${book._id}`} place="bottom" />
              </div>
            </div>
            
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary/30 to-transparent"></div>
          </motion.div>
        ))}
      </div>

      <div className="text-center my-12">
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/bookshelf")}
          className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20"
          data-tooltip-id="all-tooltip"
          data-tooltip-content="Explore our complete collection"
        >
          Explore All Books
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>
        <Tooltip id="all-tooltip" place="top" />
      </div>
    </div>
  );
};

export default HomeBooks;
