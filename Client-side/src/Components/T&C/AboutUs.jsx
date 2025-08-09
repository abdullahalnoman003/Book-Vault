import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { FaUsers, FaBookReader, FaStar, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  useDocumentTitle("About Us | Book Vault");

  const stats = [
    { number: "10K+", label: "Active Readers" },
    { number: "50K+", label: "Books Listed" },
    { number: "100+", label: "Categories" },
    { number: "4.8", label: "User Rating" },
  ];

  const features = [
    {
      icon: <FaBookReader className="text-2xl" />,
      title: "Book Discovery",
      description:
        "Find your next favorite book with our intelligent recommendation system",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Community",
      description:
        "Join a vibrant community of passionate readers and book enthusiasts",
    },
    {
      icon: <FaStar className="text-2xl" />,
      title: "Personal Library",
      description:
        "Create and manage your personal collection of favorite books",
    },
    {
      icon: <FaHandshake className="text-2xl" />,
      title: "Book Exchange",
      description: "Connect with other readers and share your favorite books",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-base-100 to-base-200">
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold">
                  Welcome to Book Vault
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your Gateway to the
                <span className="text-primary block mt-2">World of Books</span>
              </h1>

              <p className="text-lg text-base-content/80 leading-relaxed">
                Welcome to <strong className="text-primary">Book Vault</strong>,
                where passion for reading meets community. Discover amazing
                books, connect with fellow readers, and embark on countless
                literary adventures.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="badge badge-primary badge-lg">
                  Community Driven
                </span>
                <span className="badge badge-secondary badge-lg">
                  Book Lovers Paradise
                </span>
                <span className="badge badge-accent badge-lg">
                  Open Platform
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl transform rotate-3"></div>
                <div className="overflow-hidden rounded-3xl shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&h=600"
                    alt="Book Library"
                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-base-100/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Us Special
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Experience the joy of reading with our comprehensive platform
              features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-base-100 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Our Growing Community
                </h2>
                <p className="text-base-content/80 leading-relaxed mb-6">
                  Whether you're a casual reader or a bookworm, our platform
                  allows you to browse popular titles, vote for your favorites,
                  and explore new genres. We believe that books bring people
                  together—and we're here to make that experience even better.
                </p>
                <p className="text-base-content/80 leading-relaxed">
                  Join us in building a community where every reader finds their
                  perfect next book, and every book finds its perfect reader.
                </p>
              </div>

              <div className="bg-primary/10 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-base-100/50 rounded-xl hover:bg-base-100 transition-colors"
                    >
                      <div className="text-4xl font-bold text-primary mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
