import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const MyBooks = () => {
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
      <div className="h-80 min-h-screen w-full flex items-center justify-center bg-base-200 rounded-xl mt-8">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-yellow-800">
            Loading Your Books....
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl my-25 mx-auto px-4 py-10">
      <Helmet>
        <title>My Books | Book Vault</title>
      </Helmet>
      <h1 className="text-4xl font-extrabold text-center mb-2 text-primary drop-shadow-md">
        📘 My Collection
      </h1>
      <p className="text-center text-lg text-base-content mb-10">
        Manage your uploaded books and keep your personal shelf organized.
      </p>

      {books.length === 0 ? (
        <div className="text-center mt-10 space-y-4">
          <p className="text-lg font-medium">
            You haven’t added any books yet.
          </p>
          <button
            onClick={() => navigate("/add-book")}
            className="btn btn-primary"
          >
            Add a Book
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="card border border-primary bg-base-100 shadow hover:shadow-xl transition duration-300 hover:scale-[1.02]"
            >
              <figure className="px-6 pt-6">
                <img
                  src={book.cover_photo}
                  alt={book.book_title}
                  className="rounded-xl h-40 object-cover w-full border border-primary"
                />
              </figure>
              <div className="card-body space-y-2">
                <h2 className="card-title">{book.book_title}</h2>
                <p>
                  <b>Author:</b> {book.book_author}
                </p>
                <p>
                  <b>Status:</b> {book.reading_status}
                </p>
                <p>
                  <b>Pages:</b> {book.total_page}
                </p>
                <p>
                  <b>Category:</b> {book.book_category}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button
                    data-tooltip-id="edit-tooltip"
                    data-tooltip-content="Update Book"
                    onClick={() => navigate(`/update-book/${book._id}`)}
                    className="btn btn-sm btn-warning text-white"
                  >
                    <FaEdit />
                    <Tooltip id="edit-tooltip" place="bottom" />
                  </button>
                  <button
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Delete Book"
                    onClick={() => handleDelete(book._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrash />
                    <Tooltip id="delete-tooltip" place="bottom" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
