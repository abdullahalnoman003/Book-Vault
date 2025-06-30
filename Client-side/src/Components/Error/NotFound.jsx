import React from 'react';
import { Link } from 'react-router';
import { FaHome } from 'react-icons/fa';
import Lottie from 'lottie-react';
import Animation from './Animation.json';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
        
  return (
    <>
    <Helmet>
            <title>Opps! Page Not Found!</title>
          </Helmet>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <Lottie className='shadow-2xl  rounded-4xl' animationData={Animation} loop={true}/>
      <h1 className="text-7xl font-extrabold text-gray-800 mb-2 mt-5">404</h1>
      <h2 className="text-3xl font-bold text-red-600 mb-4">Oops! Page Not Found</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        The page you are looking for might have been removed or does not exist. Please check the URL or go back to the homepage.
      </p>
      <button className=" btn btn-primary  font-bold hover:shadow-xl my-3  gap-2  hover:bg-gradient-to-br  text-white px-6 py-2 rounded-md text-lg "><Link to="/" className='flex gap-2 items-center' > <FaHome/> Go back to Home</Link>
      </button>
    </div> </>
  );
};

export default NotFound;
