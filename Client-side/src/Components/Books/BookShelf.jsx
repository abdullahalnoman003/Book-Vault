import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaSort, FaHeart, FaBookOpen } from "react-icons/fa";

const categoryColors = {
  Fiction: {
    bg: "bg-purple-400",
    text: "text-purple-700",
    light: "bg-purple-100",
    border: "border-purple-300"
  },
  "Non-Fiction": {
    bg: "bg-green-400",
    text: "text-green-700",
    light: "bg-green-100",
    border: "border-green-300"
  },
  "Sci-Fi": {
    bg: "bg-blue-400",
    text: "text-blue-700",
    light: "bg-blue-100",
    border: "border-blue-300"
  },
  Mystery: {
    bg: "bg-yellow-400",
    text: "text-yellow-700",
    light: "bg-yellow-100",
    border: "border-yellow-300"
  },
  Fantasy: {
    bg: "bg-pink-400",
    text: "text-pink-700",
    light: "bg-pink-100",
    border: "border-pink-300"
  },
  Biography: {
    bg: "bg-red-400",
    text: "text-red-700",
    light: "bg-red-100",
    border: "border-red-300"
  },
};

const BookShelf = () => {
  useDocumentTitle("Bookshelf | Book Vault");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    setLoader(true);
    axios
      .get("https://book-vault-server-six.vercel.app/bookshelf", {
        params: {
          category: selectedCategory,
          search: searchTerm,
          sort: sortOption,
        },
      })
      .then((res) => {
        setBooks(res.data);
        setLoader(false);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load books!",
          footer: error.message,
        });
        setLoader(false);
        setLoading(false);
      });
  }, [selectedCategory, searchTerm, sortOption]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary">
            Loading Books... Please Wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-primary">
            Explore the Library
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover your next literary adventure from our extensive collection
          </p>
        </motion.div>

        <motion.div 
          className=" backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search by title or author..."
                className="input input-bordered pl-10 w-full   transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <FaFilter />
              </div>
              <select
                className="select select-bordered pl-10 w-full   transition-all duration-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {Object.keys(categoryColors).map(category => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <FaSort />
              </div>
              <select
                className="select select-bordered pl-10 w-full   transition-all duration-300"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Sort by (Default)</option>
                <option value="title-asc">Title (A–Z)</option>
                <option value="title-desc">Title (Z–A)</option>
                <option value="upvote-desc">Most Upvoted</option>
                <option value="upvote-asc">Least Upvoted</option>
              </select>
            </div>
          </div>
        </motion.div>

        {books.length > 0 && (
          <motion.div 
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-base-content/80 font-medium">
              Showing <span className="text-primary font-bold">{books.length}</span> books
            </p>
            <div className="flex gap-2">
              {selectedCategory !== "All" && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[selectedCategory]?.light} ${categoryColors[selectedCategory]?.text}`}>
                  {selectedCategory}
                </span>
              )}
              {searchTerm && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  Search: "{searchTerm}"
                </span>
              )}
            </div>
          </motion.div>
        )}

        {loader ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-3"
            >
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-xl font-medium text-primary">Loading books...</p>
            </motion.div>
          </div>
        ) : books.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="bg-base-200 p-6 rounded-full mb-4">
              <FaBookOpen className="text-4xl text-base-content/50" />
            </div>
            <p className="text-xl font-medium text-base-content/70 text-center">
              No books found matching your criteria
            </p>
            <button 
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
                setSortOption("default");
              }}
              className="mt-4 btn btn-outline btn-sm"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {books.map((book) => (
              <motion.div
                key={book._id}
                className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border ${categoryColors[book.book_category]?.border || "border-gray-200"}`}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`h-2 w-full ${categoryColors[book.book_category]?.bg || "bg-gray-400"}`}
                ></div>
                
                <div className="relative p-4">
                  <div className="flex justify-center">
                    <img
                      src={book.cover_photo}
                      alt={book.book_title}
                      className="w-40 h-56 object-cover rounded-lg shadow-md transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  
                  <div className="absolute top-2 right-2">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryColors[book.book_category]?.light} ${categoryColors[book.book_category]?.text}`}>
                      {book.book_category}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h2 className="text-lg font-bold line-clamp-1 mb-1 text-base-content">
                      {book.book_title}
                    </h2>
                    <p className="text-sm text-base-content/70 mb-2">
                      by {book.book_author}
                    </p>
                    
                    <div className="flex items-center justify-center gap-1 text-pink-600 mb-4">
                      <FaHeart />
                      <span className="font-medium">{book.upvote || 0} upvotes</span>
                    </div>
                    
                    <Link
                      to={`/book-details/${book._id}`}
                      className={`block w-full py-2 px-4 rounded-lg font-medium text-white transition-colors ${categoryColors[book.book_category]?.bg || "bg-primary"} hover:opacity-90 text-center`}
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookShelf;
