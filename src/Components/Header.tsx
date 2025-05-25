import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

export default function Header() {
    // const [isScrolled, setIsScrolled] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if(window.scrollY > 90) {
    //             setIsScrolled(true);
    //         }else {
    //             setIsScrolled(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return() => {
    //         window.addEventListener('scroll', handleScroll);
    //     }
    // }, [])
    return(
        // ${isScrolled ? "h-18" : "h-24"}
        <header className={`bg-white w-full fixed top-0 transition-all ease-in-out z-10`}>
            <div className="max-w-6xl font-semibold uppercase mx-auto flex items-center justify-between">
                <Link to="/">
                    <img className="w-22" src="logo.png" alt="logo" />
                </Link>
                <div className="flex gap-x-8">
                    <Link className="hover:text-green-600" to="/">Home</Link>
                    <Link className="hover:text-green-600" to="/login">Login</Link>
                    <Link className="hover:text-green-600" to="/register">Register</Link>
                    <Link className="hover:text-green-600" to="/blog">Blog</Link>
                    <Link className="hover:text-green-600" to="/calender">Calender</Link>
                    <Link className="hover:text-green-600" to="/plan">Plan</Link>
                </div>
            </div>
        </header>
    )
}