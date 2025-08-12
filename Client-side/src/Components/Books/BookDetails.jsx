import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import { BsEmojiTear } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useDocumentTitle from "../../Hooks/useDocumentTitle";


const BookDetails = () => {
  useDocumentTitle("Books Details | Book Vault")
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://book-vault-server-six.vercel.app/book-details/${id}`)
      .then((res) => {
        if (res.data?._id) {
          setBook(res.data);
        } else {
          setBook(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setBook(null);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://book-vault-server-six.vercel.app/reviews/${id}`)
      .then((res) => setReviews(res.data));
  }, [id]);

  const isOwner = user?.email === book?.user_email;

  const handleLike = () => {
    const newLike = (book.upvote || 0) + 1;
    axios
      .patch(`https://book-vault-server-six.vercel.app/upvote/${book._id}`, {
        upvote: newLike,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setBook({ ...book, upvote: newLike });
        }
      });
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    axios
      .patch(
        `https://book-vault-server-six.vercel.app/update-status/${book._id}`,
        {
          reading_status: newStatus,
        }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setBook({ ...book, reading_status: newStatus });
        }
      });
  };

  const handleReviewSubmit = async () => {
    if (!userReview.trim()) return;
    const reviewData = {
      book_id: id,
      user_email: user.email,
      review_text: userReview,
      created_at: new Date(),
    };
    try {
      const res = await axios.post(
        "https://book-vault-server-six.vercel.app/add-review",
        reviewData
      );
      if (res.data.insertedId) {
        setReviews((prev) => [
          ...prev,
          { ...reviewData, _id: res.data.insertedId },
        ]);
        setUserReview("");
        Swal.fire("Review added!", "", "success");
      }
    } catch (err) {
      Swal.fire("Error", "Could not submit review.", "error");
    }
  };

  const handleReviewUpdate = async () => {
  axios
    .patch(
      `https://book-vault-server-six.vercel.app/update-review/${editingReviewId}`,
      { review_text: userReview }
    )
    .then(() => {
      setReviews((prev) =>
        prev.map((r) =>
          r._id === editingReviewId ? { ...r, review_text: userReview } : r
        )
      );
      setEditingReviewId(null);
      setUserReview("");
      Swal.fire("Success", "Review updated successfully!", "success");
    })
    .catch(() => {
      Swal.fire("Error", "Could not update review.", "error");
    });
};

const handleReviewDelete = (reviewId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This review will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`https://book-vault-server-six.vercel.app/delete-review/${reviewId}`)
        .then(() => {
          setReviews((prev) => prev.filter((r) => r._id !== reviewId));
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
        })
        .catch(() => {
          Swal.fire("Error", "Could not delete review.", "error");
        });
    }
  });
};


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-base-200 to-base-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
          <p className="text-xl font-medium text-primary">Loading book details...</p>
        </motion.div>
      </div>
    );
  }

  if (!book) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-base-200 to-base-100 py-16 px-4"
      >
        <div className="bg-error/10 p-6 rounded-full mb-6">
          <BsEmojiTear className="text-[80px] text-error" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-error to-error/60 bg-clip-text text-transparent">
          Book Not Found!
        </h2>
        <p className="text-base-content/70 text-lg max-w-md mb-8 text-center">
          We couldn't find the book you're looking for. It might have been removed or never existed.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="btn btn-primary btn-lg gap-2 shadow-lg"
        >
          <span className="text-xl">←</span> Go Back to Library
        </motion.button>
      </motion.div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Title section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary">
            {book.book_title}
          </h1>
          <p className="text-base-content/70 text-lg">
            By <span className="font-medium">{book.book_author}</span> • {book.book_category}
          </p>
        </motion.div>

        {/* Main content */}
        <motion.div 
          className="bg-base-100/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Book image */}
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 md:hidden"></div>
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Details section */}
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                  {book.book_category}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={isOwner}
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${isOwner ? 'bg-base-200 text-base-content/50' : 'bg-red-50 text-red-500 hover:bg-red-100'} transition-colors`}
                  >
                    <FaHeart className={isOwner ? 'text-base-content/30' : 'text-red-500'} />
                    <span>{book.upvote || 0}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-base-content/80">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-base-200/50 p-3 rounded-lg">
                    <p className="text-xs text-base-content/60 uppercase">Pages</p>
                    <p className="font-bold text-lg">{book.total_page}</p>
                  </div>
                  <div className="bg-base-200/50 p-3 rounded-lg">
                    <p className="text-xs text-base-content/60 uppercase">Status</p>
                    {isOwner ? (
                      <select
                        value={book.reading_status}
                        onChange={handleStatusChange}
                        className="select select-ghost select-sm p-0 font-bold text-base h-auto focus:outline-none"
                      >
                        <option>Want-to-Read</option>
                        <option>Reading</option>
                        <option>Read</option>
                      </select>
                    ) : (
                      <p className="font-bold text-lg">{book.reading_status}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-bold text-base-content mb-2">Overview</h3>
                  <p className="text-base-content/80 leading-relaxed">{book.book_overview}</p>
                </div>

                <div className="border-t border-base-300 pt-4">
                  <h3 className="text-sm font-medium text-base-content/60 mb-1">Added By</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {book.user_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-medium text-base-content">{book.user_name}</p>
                      <p className="text-xs text-base-content/60">{book.user_email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-secondary/80 bg-clip-text text-transparent">
              Reader Reviews
            </h2>
            <div className="bg-base-200/50 px-3 py-1 rounded-full text-sm text-base-content/70">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-base-100/30 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="inline-block p-4 bg-base-200 rounded-full mb-4">
                <span className="text-4xl">💬</span>
              </div>
              <h3 className="text-xl font-medium mb-2">No Reviews Yet</h3>
              <p className="text-base-content/60 mb-6">Be the first to share your thoughts about this book!</p>
              {user && (
                <button 
                  onClick={() => document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-primary btn-sm"
                >
                  Write a Review
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className={`bg-base-100/40 backdrop-blur-sm rounded-xl p-5 border-l-4 ${
                    review.user_email === user?.email 
                      ? 'border-primary' 
                      : 'border-base-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {review.user_email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-base-content text-sm">{review.user_email}</p>
                        <p className="text-xs text-base-content/50">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {review.user_email === user?.email && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditingReviewId(review._id);
                            setUserReview(review.review_text);
                            setTimeout(() => document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' }), 100);
                          }}
                          className="btn btn-circle btn-xs btn-ghost text-yellow-500 hover:bg-yellow-50"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleReviewDelete(review._id)}
                          className="btn btn-circle btn-xs btn-ghost text-red-500 hover:bg-red-50"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="pl-11">
                    <p className="text-base-content/80">{review.review_text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Review form */}
          {user && (
            <motion.div 
              id="review-form"
              className={`bg-base-100/50 backdrop-blur-sm rounded-xl p-6 border ${
                editingReviewId ? 'border-yellow-300' : 'border-base-300'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4">
                {editingReviewId ? 'Edit Your Review' : 'Share Your Thoughts'}
              </h3>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editingReviewId ? handleReviewUpdate() : handleReviewSubmit();
                }}
                className="space-y-4"
              >
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  className="textarea textarea-bordered w-full bg-base-100/80 h-32 focus:border-primary"
                  placeholder="What did you think about this book?"
                />
                
                <div className="flex gap-3 justify-end">
                  {editingReviewId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingReviewId(null);
                        setUserReview("");
                      }}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  )}
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className={`btn ${editingReviewId ? 'btn-warning' : 'btn-primary'}`}
                    disabled={!userReview.trim()}
                  >
                    {editingReviewId ? 'Update Review' : 'Submit Review'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetails;
