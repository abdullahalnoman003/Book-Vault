import React from "react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { FaBook, FaUserShield, FaClipboardList, FaCopyright, FaBan, FaHistory } from "react-icons/fa";

const Terms = () => {
  useDocumentTitle("Terms & Condition | Book Vault");

  const sections = [
    {
      icon: <FaBook className="text-2xl" />,
      title: "1. Use of the Platform",
      content: "You agree to use BookVault responsibly and lawfully. Misuse of the platform including spamming, unauthorized access, or harmful content will lead to account termination."
    },
    {
      icon: <FaUserShield className="text-2xl" />,
      title: "2. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your login credentials. Any activity through your account is your responsibility."
    },
    {
      icon: <FaClipboardList className="text-2xl" />,
      title: "3. Book Management & Reviews",
      content: "BookVault allows you to organize your books, write reviews, and track your reading. Please ensure your reviews and comments are respectful and comply with community standards."
    },
    {
      icon: <FaCopyright className="text-2xl" />,
      title: "4. Intellectual Property",
      content: "All platform design, branding, and content are property of BookVault. You may not use any part of it without written permission."
    },
    {
      icon: <FaBan className="text-2xl" />,
      title: "5. Termination",
      content: "We reserve the right to suspend or terminate accounts that violate these terms without notice."
    },
    {
      icon: <FaHistory className="text-2xl" />,
      title: "6. Changes to Terms",
      content: "These terms may be updated from time to time. Continued use of BookVault indicates your acceptance of the updated terms."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 px-4 py-20 text-base-content">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
            <span className="text-4xl">📜</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
            Review the rules and responsibilities of using our platform.
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-bold text-primary">BookVault</span>. 
            By accessing or using our website, you agree to the following terms and conditions. 
            Please read them carefully before continuing.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="grid gap-6 md:gap-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  {section.icon}
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-primary">
                    {section.title}
                  </h2>
                  <p className="text-base-content/80 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-base-content/60 font-medium">
            Last updated: June 5, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
