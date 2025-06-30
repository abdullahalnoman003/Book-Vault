import React from "react";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <div className="bg-base-100 my-25 min-h-screen px-6 py-10 text-base-content">
      <Helmet>
        <title>Privacy & Policy | Book Vault</title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-base-200 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-primary drop-shadow-md">
          🔏 Privacy Policy
        </h1>
        <p className="text-center text-lg text-base-content mb-10">
          Understand how we protect your data and keep your information secure.
        </p>

        <p className="mb-4">
          At <strong>BookVault</strong>, your privacy is our priority. This
          policy explains how we collect, use, and protect your information when
          you use our digital bookshelf platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Name, email address, and profile image (via Firebase Authentication)
          </li>
          <li>Your added books, reviews, and reading status</li>
          <li>Interaction logs (likes, upvotes, preferences)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Data
        </h2>
        <p className="mb-4">
          We use your information to provide core features: organizing books,
          managing reading lists, and delivering a personalized experience. We
          also use anonymized data to improve BookVault.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
        <p className="mb-4">
          We do not sell your data. We only share necessary info with trusted
          services like Firebase, for authentication and storage, while ensuring
          your data is secured.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Security Measures
        </h2>
        <p className="mb-4">
          We use encryption and industry-standard practices to safeguard your
          data. However, no system can guarantee complete security.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <p className="mb-4">
          You can update your profile, delete your account, or request data
          removal by contacting our support team or via account settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Policy Updates</h2>
        <p className="mb-4">
          We may update this policy periodically. Updates will be posted here,
          and your continued use of BookVault confirms your acceptance.
        </p>

        <p className="text-sm text-gray-500 mt-6">Last updated: June 5, 2025</p>
      </div>
    </div>
  );
};

export default Privacy;
