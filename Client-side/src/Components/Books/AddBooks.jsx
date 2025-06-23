import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const AddBook = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
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
          form.reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Could not add the book. Try again.",
          });
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
        console.error(error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto my-25 p-6 bg-base-200 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        📚 Add New Book 📚
      </h2>
      <h1 className="font-bold  text-center text-xl mb-2">
        Fill up the Details page to add Books!
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Book Title */}
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

        {/* Cover Photo */}
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

        {/* Total Pages */}
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

        {/* Book Author */}
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

        {/* User Email */}
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

        {/* User Name */}
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

        {/* Book Category */}
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

        {/* Reading Status */}
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

        {/* Book Overview */}
        <div>
          <label className="label font-semibold">Book Overview</label>
          <textarea
            name="book_overview"
            className="textarea textarea-bordered w-full"
            placeholder="Write a short summary about the book"
            required
          ></textarea>
        </div>

        {/* Upvote */}
        <div>
          <label className="label font-semibold">Upvote</label>
          <input
            type="number"
            value={0}
            readOnly
            className="input input-bordered w-full bg-base-100 text-base-content"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="btn btn-primary w-full" type="submit">
            ➕ Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
