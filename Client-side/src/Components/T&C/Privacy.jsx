import React from "react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { FaShieldAlt, FaUserLock, FaDatabase, FaLock, FaUserCog, FaHistory } from "react-icons/fa";

const Privacy = () => {
  useDocumentTitle("Privacy & Policy | Book Vault");

  const privacySections = [
    {
      icon: <FaUserLock />,
      title: "Information We Collect",
      content: [
        "Name, email address, and profile image (via Firebase Authentication)",
        "Your added books, reviews, and reading status",
        "Interaction logs (likes, upvotes, preferences)"
      ]
    },
    {
      icon: <FaDatabase />,
      title: "How We Use Your Data",
      content: ["We use your information to provide core features: organizing books, managing reading lists, and delivering a personalized experience. We also use anonymized data to improve BookVault."]
    },
    {
      icon: <FaShieldAlt />,
      title: "Data Sharing",
      content: ["We do not sell your data. We only share necessary info with trusted services like Firebase, for authentication and storage, while ensuring your data is secured."]
    },
    {
      icon: <FaLock />,
      title: "Security Measures",
      content: ["We use encryption and industry-standard practices to safeguard your data. However, no system can guarantee complete security."]
    },
    {
      icon: <FaUserCog />,
      title: "Your Rights",
      content: ["You can update your profile, delete your account, or request data removal by contacting our support team or via account settings."]
    },
    {
      icon: <FaHistory />,
      title: "Policy Updates",
      content: ["We may update this policy periodically. Updates will be posted here, and your continued use of BookVault confirms your acceptance."]
    }
  ];

  return (
    <div className=" py-20 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="inline-block p-4 rounded-full bg-primary/10 mb-6">
            <span className="text-4xl">🔏</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
            At <span className="text-primary font-semibold">BookVault</span>, your privacy is our priority. 
            This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {privacySections.map((section, index) => (
            <div 
              key={index}
              className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary text-2xl flex-shrink-0">
                  {section.icon}
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-primary">
                    {index + 1}. {section.title}
                  </h2>
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-2 text-base-content/80">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base-content/80 leading-relaxed">
                      {section.content}
                    </p>
                  )}
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

export default Privacy;
