import { Link } from "react-router-dom"

export default function Header() {
    return(
        <header>
            <div className="max-w-6xl font-semibold uppercase mx-auto flex items-center justify-between w-full px-4">
                <Link to="/">
                    <img className="w-24" src="logo.png" alt="logo" />
                </Link>
                <div className="flex gap-x-8">
                    <Link className="hover:text-green-600" to="/">Home</Link>
                    <Link className="hover:text-green-600" to="/login">Login</Link>
                    <Link className="hover:text-green-600" to="/register">Register</Link>
                    <Link className="hover:text-green-600" to="/blog">Blog</Link>
                    <Link className="hover:text-green-600" to="/calender">Calender</Link>
                </div>
            </div>
        </header>
    )
}