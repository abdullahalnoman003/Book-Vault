import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const AddBook = () => {
  useDocumentTitle("Add Books | Book Vault");
  const [clicked, setClicked] =useState(false);
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    setClicked(true);
    e.preventDefault();
    const form = e.target;

    const newBook = {
      book_title: form.book_title.value,
      cover_photo: form.cover_photo.value,
      total_page: parseInt(form.total_page.value),
      book_author: form.book_author.value,
      user_email: user?.email,
      user_name: user?.displayName,
      book_category: form.book_category.value,
      reading_status: form.reading_status.value,
      book_overview: form.book_overview.value,
      upvote: 0,
    };

    axios
      .post("https://book-vault-server-six.vercel.app/add-book", newBook, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Book Added!",
            text: "Your book has been added to BookVault.",
            timer: 2000,
            showConfirmButton: false,
          });
          setClicked(false);
          form.reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Could not add the book. Try again.",
          });
          setClicked(false);
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
        setClicked(false);
      });
  };

  return (
  <div>
    <div className="max-w-5xl  mx-auto my-20  p-8 bg-base-200 rounded-2xl shadow-md">
      <h1 className="text-4xl font-extrabold text-center mb-2 text-primary drop-shadow-md">
        📚 Add a New Book
      </h1>
      <p className="text-center text-lg text-base-content mb-8">
        Share your collection with the world by adding a new book to the shelf.
      </p>

      <h2 className="font-bold text-center text-xl mb-6">
        Fill up the Details to Add Books!
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label font-semibold">Book Title</label>
          <input
            type="text"
            name="book_title"
            required
            className="input input-bordered w-full"
            placeholder="Enter book title"
          />
        </div>
        <div>
          <label className="label font-semibold">Cover Photo URL</label>
          <input
            type="text"
            name="cover_photo"
            required
            className="input input-bordered w-full"
            placeholder="Paste cover image URL"
          />
        </div>
        <div>
          <label className="label font-semibold">Total Pages</label>
          <input
            type="number"
            name="total_page"
            required
            className="input input-bordered w-full"
            placeholder="e.g. 300"
          />
        </div>
        <div>
          <label className="label font-semibold">Book Author</label>
          <input
            type="text"
            name="book_author"
            required
            className="input input-bordered w-full"
            placeholder="Author name"
          />
        </div>
        <div>
          <label className="label font-semibold">Your Email</label>
          <input
            type="email"
            name="user_email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-base-100 text-base-content"
          />
        </div>
        <div>
          <label className="label font-semibold">Your Name</label>
          <input
            type="text"
            name="user_name"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-base-100 text-base-content"
          />
        </div>

        <div>
          <label className="label font-semibold">Book Category</label>
          <select
            name="book_category"
            required
            defaultValue=""
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
            defaultValue=""
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
        <div className="md:col-span-2">
          <label className="label font-semibold">Book Overview</label>
          <textarea
            name="book_overview"
            className="textarea textarea-bordered w-full"
            placeholder="Write a short summary about the book"
            required
            rows={4}
          ></textarea>
        </div>
        <div className="md:col-span-2 text-center">
          <button className="btn btn-primary w-full" type="submit" disabled={clicked}>
            {clicked ? <p className="loading"></p> : "➕ Add Book"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default AddBook;
