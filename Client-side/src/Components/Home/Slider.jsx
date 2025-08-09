import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd4vUDLbX7DKXHWtzD7o6apEjptVYIqFLr2kkQ6e_cuL8-GvxIFNsJkKUL9_tI48fwiMQssihS-XD3L283PdZ7xLdyOaTU8fciOTcIBAfoiZYfgj-7sC60qAxr7AGgGl1-_s_5l90kEw4/s16000/library+reading.jpg",
    title: "Discover Timeless Classics",
    description: "From Shakespeare to Tolstoy — your literary journey begins here.",
  },
  {
    img: "https://thesweetsetup.com/wp-content/uploads/2022/11/booktrackerheroimage.jpeg",
    title: "Track Your Progress",
    description: "Visualize your reading goals and grow your personal library.",
  },
  {
    img: "https://library.vgu.edu.vn/wp-content/uploads/2023/11/book-library-with-old-open-textbook-stack-piles-literature-text-archive-reading-desk-1200x800.jpg",
    title: "Write Reviews & Share",
    description: "Connect with fellow readers by sharing your thoughts on books.",
  },
  {
    img: "https://teaching.utoronto.ca/wp-content/uploads/nijueqw0rkg-scaled.jpg",
    title: "Your Digital Bookshelf",
    description: "Organize books as Read, Reading, or Want to Read — all in one place.",
  },
  {
    img: "https://i.ibb.co/S4YN9Yym/image.png",
    title: "Join the BookVault Community",
    description: "Engage, explore, and elevate your reading experience.",
  },
];

const Slider = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        🫡Why{" "}
        <span className="text-primary">Book</span>
        <span className="text-secondary">Vault</span> ?
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3
        }}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        speed={800}
        className="rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] group"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative group h-[420px] sm:h-[480px] md:h-[540px] overflow-hidden rounded-2xl">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover transform transition-all duration-700 scale-105 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent  opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
                <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="inline-flex items-center bg-primary/20 backdrop-blur-xl px-4 py-1 rounded-full mb-4 text-primary text-sm">
                    Feature {i + 1} of {slides.length}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-lg">
                    {slide.title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-xl mb-6">
                    {slide.description}
                  </p>
                  
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
