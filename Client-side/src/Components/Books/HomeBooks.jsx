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
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-center font-bold text-primary text-4xl pb-2 min-sm:hidden">Trending Reads</h2>
      <h2 className="flex justify-center">
        
      <div className="max-sm:hidden"><FuzzyText baseIntensity={0.1} hoverIntensity={0.25} enableHover={true}>
          Trending Reads
        </FuzzyText></div>  
      
      </h2>
      <p className="text-center text-gray-500 font-medium mt-1">
        Most liked books by our readers
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {topBooks.map((book) => (
          <motion.div
            key={book._id}
            data-aos="zoom-in"
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
              y: -4,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="bg-base-100 border border-primary rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="w-full h-fit">
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-full h-[356px] object-cover max-sm:h-[480px]"
              />
            </div>
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div className="space-y-1">
                <h2 className="text-xl font-bold">{book.book_title}</h2>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Author:</span>{" "}
                  {book.book_author}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Category:</span>{" "}
                  {book.book_category}
                </p>
                <p className="flex items-center gap-1 text-pink-600 font-semibold mt-2">
                  <FaHeart
                    data-tooltip-id={`like-${book._id}`}
                    data-tooltip-content="Readers loved this"
                    data-tooltip-delay-show={500}
                  />
                  {book.upvote || 0}
                  <Tooltip id={`like-${book._id}`} place="top" />
                </p>
              </div>
              <div className="card-actions justify-end mt-4">
                <button
                  data-tooltip-id={`details-${book._id}`}
                  data-tooltip-content="View book details"
                  data-tooltip-delay-show={500}
                  onClick={() => navigate(`/book-details/${book._id}`)}
                  className="btn btn-outline btn-primary btn-sm"
                >
                  View Details
                </button>
                <Tooltip id={`details-${book._id}`} place="bottom" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center my-8">
        <button
          data-tooltip-id="all-tooltip"
          data-tooltip-content="Browse all books in the bookshelf"
          data-tooltip-delay-show={500}
          onClick={() => navigate("/bookshelf")}
          className="btn btn-primary shadow-md"
        >
          See All Books
        </button>
        <Tooltip id="all-tooltip" place="top" />
      </div>
    </div>
  );
};

export default HomeBooks;
