import { Link } from "react-router-dom"

export default function Header() {
    return(
        <header className="bg-[#121212] flex items-center justify-between w-full px-4!">
            <Link to="/">
                <img className="w-18" src="logo.png" alt="logo" />
            </Link>
            <div className="flex gap-x-8">
                <Link className="text-white! hover:text-green-600!" to="/">Home</Link>
                <Link className="text-white! hover:text-green-600!" to="/login">Login</Link>
                <Link className="text-white! hover:text-green-600!" to="/register">Register</Link>
                <Link className="text-white! hover:text-green-600!" to="/blog">Blog</Link>
            </div>
        </header>
    )
}