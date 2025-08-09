import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const categoryColors = {
  Fiction: "bg-purple-400",
  "Non-Fiction": "bg-green-400",
  "Sci-Fi": "bg-blue-400",
  Mystery: "bg-yellow-400",
  Fantasy: "bg-pink-400",
  Biography: "bg-red-400",
};

const BookShelf = () => {
  useDocumentTitle("📚 Bookshelf | Book Vault")
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-vault-server-six.vercel.app/bookshelf")
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
        });
        setLoading(false);
      });
  }, []);

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.book_category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-base-200">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-yellow-800">
            Loading Books... Please Wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl my-23 mx-auto p-4 ">
      <h1 className="text-4xl font-extrabold text-center mb-2 text-primary drop-shadow-md">
        📚 Explore the Library
      </h1>
      <p className="text-center text-lg text-base-content mb-10">
        Discover every book at your fingertips – filtered and ready
        to read.
      </p>

      <div className="flex justify-center mb-8">
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option>Fantasy</option>
          <option>Mystery</option>
          <option>Fiction</option>
          <option>Biography</option>
          <option>Non-Fiction</option>
          <option>Sci-Fi</option>
        </select>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="relative rounded-3xl  shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div
              className={`h-2 rounded-t-3xl  ${
                categoryColors[book.book_category] || "bg-gray-400"
              }`}
            ></div>

            <div className="flex justify-center p-5">
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-60 h-80 object-cover rounded-xl border border-primary shadow-md"
              />
            </div>
            <div className="p-6  text-center flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2 tracking-wide  hover:text-primary transition-colors duration-300">
                {book.book_title}
              </h2>
              <p className="text-sm  mb-1">
                <span className="font-medium">Author:</span> {book.book_author}
              </p>
              <p className="text-sm  mb-1">
                <span className="font-medium">Category:</span>{" "}
                {book.book_category}
              </p>
              <p className="text-sm text-pink-600 font-semibold mb-4">
                Upvotes: {book.upvote || 0}
              </p>
              <Link
                to={`/book-details/${book._id}`}
                className="btn btn-primary w-full text-white font-semibold hover:bg-primary-focus transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
