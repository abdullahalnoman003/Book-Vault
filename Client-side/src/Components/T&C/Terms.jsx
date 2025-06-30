import React from "react";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <div className="bg-base-100 my-25 min-h-screen px-6 py-10 text-base-content">
      <Helmet>
        <title>Terms & Condition | Book Vault</title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-base-200 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-primary drop-shadow-md">
          📜 Terms & Conditions
        </h1>
        <p className="text-center text-lg text-base-content mb-10">
          Review the rules and responsibilities of using our platform.
        </p>

        <p className="mb-4">
          Welcome to <strong>BookVault</strong>. By accessing or using our
          website, you agree to the following terms and conditions. Please read
          them carefully before continuing.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Use of the Platform
        </h2>
        <p className="mb-4">
          You agree to use BookVault responsibly and lawfully. Misuse of the
          platform including spamming, unauthorized access, or harmful content
          will lead to account termination.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your login
          credentials. Any activity through your account is your responsibility.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Book Management & Reviews
        </h2>
        <p className="mb-4">
          BookVault allows you to organize your books, write reviews, and track
          your reading. Please ensure your reviews and comments are respectful
          and comply with community standards.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Intellectual Property
        </h2>
        <p className="mb-4">
          All platform design, branding, and content are property of BookVault.
          You may not use any part of it without written permission.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate accounts that violate
          these terms without notice.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
        <p className="mb-4">
          These terms may be updated from time to time. Continued use of
          BookVault indicates your acceptance of the updated terms.
        </p>

        <p className="text-sm text-gray-500 mt-6">Last updated: June 5, 2025</p>
      </div>
    </div>
  );
};

export default Terms;
