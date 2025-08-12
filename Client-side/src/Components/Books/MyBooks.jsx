import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { FaTrash, FaEdit, FaPlus, FaBook } from "react-icons/fa";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { motion } from "framer-motion";

const MyBooks = () => {
  useDocumentTitle("My Books | Book Vault");
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.accessToken || !user?.email) return;

    setLoading(true);
    axios
      .get(
        `https://book-vault-server-six.vercel.app/my-books?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        setBooks(res.data || []);
      })
      .catch((err) => {
        console.error("Error loading books:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Book will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4ade80",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://book-vault-server-six.vercel.app/delete-book/${id}`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          )
          .then((res) => {
            if (res.data.deletedCount) {
              setBooks(books.filter((book) => book._id !== id));
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your book has been Deleted.",
                timer: 2000,
                showConfirmButton: false,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something Went Wrong!",
              footer: error.message,
              timer: 2000,
            });
            setLoading(false);
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-base-200 to-base-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
          <p className="text-xl font-medium text-primary">
            Loading your collection...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        
          <h1 className="text-4xl text-primary sm:text-5xl font-bold mb-4">
            My Collection
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Manage your uploaded books and keep your personal library organized
          </p>
        </motion.div>

        {books.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-base-200 p-6 rounded-full mb-6">
              <FaBook className="text-5xl text-base-content/40" />
            </div>
            <h2 className="text-2xl font-medium mb-3 text-base-content">Your collection is empty</h2>
            <p className="text-base-content/60 mb-8 text-center max-w-md">
              You haven't added any books to your collection yet. Start building your personal library now!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/add-book")}
              className="btn btn-primary btn-lg gap-2"
            >
              <FaPlus /> Add Your First Book
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-medium text-base-content/80">
                <span className="text-primary font-bold">{books.length}</span> Books in Your Collection
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/add-book")}
                className="btn btn-primary gap-2"
              >
                <FaPlus size={14} /> Add New Book
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="bg-base-100/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={book.cover_photo}
                      alt={book.book_title}
                      className="w-full h-56 object-cover object-center"
                    />
                    <div className="absolute top-0 right-0 p-2 flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        data-tooltip-id={`edit-tooltip-${book._id}`}
                        data-tooltip-content="Edit Book"
                        onClick={() => navigate(`/update-book/${book._id}`)}
                        className="btn btn-circle btn-sm bg-yellow-500 hover:bg-yellow-600 border-none text-white"
                      >
                        <FaEdit />
                        <Tooltip id={`edit-tooltip-${book._id}`} place="left" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        data-tooltip-id={`delete-tooltip-${book._id}`}
                        data-tooltip-content="Delete Book"
                        onClick={() => handleDelete(book._id)}
                        className="btn btn-circle btn-sm bg-red-500 hover:bg-red-600 border-none text-white"
                      >
                        <FaTrash />
                        <Tooltip id={`delete-tooltip-${book._id}`} place="left" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold line-clamp-1 mb-1 text-base-content hover:text-primary transition-colors">
                      {book.book_title}
                    </h3>
                    <p className="text-sm text-base-content/70 mb-3">
                      by {book.book_author}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 text-sm text-base-content/80 mb-4">
                      <div className="px-2 py-1 bg-primary/10 rounded-full">
                        {book.book_category}
                      </div>
                      <div className="px-2 py-1 bg-secondary/10 rounded-full">
                        {book.reading_status}
                      </div>
                      <div className="px-2 py-1 bg-base-300/50 rounded-full">
                        {book.total_page} pages
                      </div>
                    </div>
                    
                    <button
                      onClick={() => navigate(`/book-details/${book._id}`)}
                      className="w-full btn btn-sm btn-outline btn-primary"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
