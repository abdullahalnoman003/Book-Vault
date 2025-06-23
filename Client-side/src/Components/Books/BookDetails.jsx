import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import { BsEmojiTear } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";


const BookDetails = () => {
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
      <div className="h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (!book) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center mt-10 mb-10 text-center px-4"
    >
      <BsEmojiTear className="text-[100px] text-error animate-bounce mb-4" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-error mb-2">
        Book Not Found!
      </h2>
      <p className="text-base-content/80 text-lg md:text-xl max-w-md mb-6">
        We couldn't find the book you're looking for. It might have been removed or never existed.
      </p>
      <button
        onClick={() => window.history.back()}
        className="btn btn-outline btn-primary"
      >
        🔙 Go Back
      </button>
    </motion.div>
  );
}


  return (
    <div className="max-w-5xl mx-auto px-4 my-20 py-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-8">
        {book.book_title}
      </h1>

      {/* Main content */}
      <div className="grid md:grid-cols-2 gap-10 bg-base-100 p-6 rounded-xl shadow-xl">
        {/* Book image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full aspect-[3/4] overflow-hidden rounded-lg border border-secondary"
        >
          <img
            src={book.cover_photo}
            alt={book.book_title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Details section */}
        <div className="space-y-4 text-base-content text-lg leading-relaxed">
          <p>
            <span className="font-bold text-secondary">Author:</span>{" "}
            <span className="text-base-content">{book.book_author}</span>
          </p>
          <p>
            <span className="font-bold text-secondary">Pages:</span>{" "}
            <span className="text-base-content">{book.total_page}</span>
          </p>
          <p>
            <span className="font-bold text-secondary">Upvotes:</span>{" "}
            <span className="text-base-content">{book.upvote || 0}</span>
          </p>
          <p>
            <span className="font-bold text-secondary">Category:</span>{" "}
            <span className="text-base-content">{book.book_category}</span>
          </p>
          <p>
            <span className="font-bold text-secondary">Reading Status:</span>{" "}
            {isOwner ? (
              <select
                value={book.reading_status}
                onChange={handleStatusChange}
                className="select select-bordered select-sm ml-2 border-accent text-base-content-content"
              >
                <option>Want-to-Read</option>
                <option>Reading</option>
                <option>Read</option>
              </select>
            ) : (
              <span className="ml-2 text-base-content">
                {book.reading_status}
              </span>
            )}
          </p>
          <p>
            <span className="font-bold text-primary">Owner:</span>{" "}
            <span className="text-base-content">{book.user_name}</span>
          </p>
          <p>
            <span className="font-bold text-primary">Email:</span>{" "}
            <span className="text-base-content">{book.user_email}</span>
          </p>
          <div>
            <p className="font-bold text-secondary mb-1">Overview:</p>
            <p className="text-base-content">{book.book_overview}</p>
          </div>
          <button
            disabled={isOwner}
            onClick={handleLike}
            className="btn btn-outline btn-error btn-sm mt-4"
          >
            <FaHeart className="mr-2" /> Upvote ({book.upvote || 0})
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-secondary mb-6">
          Reviews 💬
        </h2>

        {reviews.length === 0 ? (
          <p className="text-center text-base-content/70">No reviews yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="bg-base-200 p-4 rounded-lg shadow border border-primary"
              >
                <p className="font-semibold text-base-content">
                  {r.user_email}
                </p>
                <p className="text-base-content">{r.review_text}</p>
                {r.user_email === user?.email && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setEditingReviewId(r._id);
                        setUserReview(r.review_text);
                      }}
                      className="btn btn-xs btn-warning"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleReviewDelete(r._id)}
                      className="btn btn-xs btn-error"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Review form */}
        {user && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingReviewId ? handleReviewUpdate() : handleReviewSubmit();
            }}
            className="mt-8 space-y-3"
          >
            <textarea
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              className="textarea textarea-bordered w-full text-base-content"
              placeholder="Write your review..."
            />
            <button type="submit" className="btn btn-primary">
              {editingReviewId ? "Update Review" : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
