import React, { useContext, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFE"];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://book-vault-server-six.vercel.app/my-books/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((res) => {
          setBooks(res.data);
          const categoryCount = {};
          res.data.forEach((book) => {
            categoryCount[book.book_category] =
              (categoryCount[book.book_category] || 0) + 1;
          });

          const chartData = Object.entries(categoryCount).map(
            ([category, count]) => ({
              name: category,
              value: count,
            })
          );
          setCategoryData(chartData);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Failed to fetch books",
            text: err.message,
          });
        });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile was successfully updated!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-30 bg-base-200 px-4 ">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="card bg-base-100 shadow-xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-center text-primary">
            👤 My Profile
          </h2>

          <div className="flex flex-col items-center gap-3 mb-6">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-primary object-cover"
            />
            <p className="font-bold">{user?.displayName || "N/A"}</p>
            <p className="text-center">
              <span className="font-bold">Email:</span> {user?.email}
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Display Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* Bookshelf Summary */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center text-secondary">
            📚 My Bookshelf Summary
          </h3>
          <p className="text-center mb-4">
            <strong>Total Books:</strong> {books.length}
          </p>

          {categoryData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">
              No books added yet for chart.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
