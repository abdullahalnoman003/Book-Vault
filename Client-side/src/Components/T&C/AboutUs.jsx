import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <section className="bg-base-100 text-base-content  px-4 py-16 md:py-24">
     <Helmet>
      <title>About Us | Book Vault</title>
     </Helmet>
      <div className="max-w-6xl h-screen  mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <div
          className="overflow-hidden rounded-xl shadow-lg"
        >
          <img data-aos="zoom-in"
            src="https://i.ibb.co/wF1HLPz6/pexels-ivo-rainha-527110-1290141.jpg"
            alt="About Us"
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div
          className="space-y-6"
        >
          <h2 data-aos="zoom-in" className="text-3xl font-bold leading-snug">
            About <span className="text-primary">Us</span>
          </h2>
          <p data-aos="zoom-in"  className="text-base leading-relaxed">
            Welcome to <strong>Book Vault</strong>, your one-stop destination for
            discovering and sharing your favorite books. Our mission is to
            connect passionate readers, promote great literature, and make book
            discovery easier for everyone.
          </p>
          <p data-aos="zoom-in" className="text-base leading-relaxed">
            Whether you're a casual reader or a bookworm, our platform allows you
            to browse popular titles, vote for your favorites, and explore new
            genres. We believe that books bring people together—and we’re here to
            make that experience even better.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="badge badge-outline badge-primary">Community</span>
            <span className="badge badge-outline badge-secondary">Book Lovers</span>
            <span className="badge badge-outline badge-accent">Open Platform</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
