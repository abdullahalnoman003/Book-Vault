import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const UpdateBook = () => {
  useDocumentTitle("Update Your Book | Book Vault")
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    axios
      .get(`https://book-vault-server-six.vercel.app/book-details/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Could not load book!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/my-books");
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center rounded-xl mt-8">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary">
            Fetching book info...
          </p>
        </div>
      </div>
    );
  }

  const handleUpdate = (e) => {
    setClicked(true);
    e.preventDefault();
    const form = e.target;
    const updatedBook = {
      book_title: form.book_title.value,
      cover_photo: form.cover_photo.value,
      total_page: parseInt(form.total_page.value),
      book_author: form.book_author.value,
      book_category: form.book_category.value,
      reading_status: form.reading_status.value,
      book_overview: form.book_overview.value,
    };

    axios
      .put(
        `https://book-vault-server-six.vercel.app/update-book/${id}`,
        updatedBook
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Book Updated!",
            text: "Your book has been successfully updated.",
            timer: 2000,
            showConfirmButton: false,
          });
          setClicked(false);
          navigate("/my-books");
        } else {
          Swal.fire({
            icon: "info",
            title: "Notice!",
            text: "No changes were made.",
            timer: 2000,
            showConfirmButton: false,
          });
          setClicked(false);
        }
      })
      .catch((error) => {
        Swal.fire("Error", "Something went wrong!", "error");
        console.error(error);
        setClicked(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto  my-20 p-6 bg-base-200 rounded-2xl shadow-md">
      <h1 className="text-4xl font-extrabold text-center mb-2 text-primary drop-shadow-md">
        ✏️ Update Book Info
      </h1>
      <p className="text-center text-lg text-base-content mb-10">
        Keep your book details accurate and up to date for everyone to enjoy.
      </p>

      <h1 className="font-bold text-center text-xl mb-2">
        Modify the details to update your book!
      </h1>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="label font-semibold">Book Title</label>
          <input
            type="text"
            name="book_title"
            defaultValue={book.book_title}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-semibold">Cover Photo URL</label>
          <input
            type="text"
            name="cover_photo"
            defaultValue={book.cover_photo}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-semibold">Total Pages</label>
          <input
            type="number"
            name="total_page"
            defaultValue={book.total_page}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-semibold">Book Author</label>
          <input
            type="text"
            name="book_author"
            defaultValue={book.book_author}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-semibold">Book Category</label>
          <select
            name="book_category"
            required
            defaultValue={book.book_category}
            className="select select-bordered w-full"
          >
            <option disabled value="">
              Select category
            </option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Sci-Fi</option>
            <option>Mystery</option>
            <option>Fantasy</option>
            <option>Biography</option>
          </select>
        </div>

        <div>
          <label className="label font-semibold">Reading Status</label>
          <select
            name="reading_status"
            required
            defaultValue={book.reading_status}
            className="select select-bordered w-full"
          >
            <option disabled value="">
              Select status
            </option>
            <option value="Read">Read</option>
            <option value="Reading">Reading</option>
            <option value="Want-to-Read">Want-to-Read</option>
          </select>
        </div>

        <div>
          <label className="label font-semibold">Book Overview</label>
          <textarea
            name="book_overview"
            defaultValue={book.book_overview}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button className="btn btn-success w-full" type="submit" disabled={clicked}>
            {clicked ? <p className="loading text-black"></p> : "🔄 Update Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
