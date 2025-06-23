import React from 'react';
import Navbar from '../Components/Nav+Footer/Navbar';
import Footer from '../Components/Nav+Footer/Footer';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            <>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
            </>
        </div>
    );
};

export default HomeLayout;