import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import SignOutButton from "./SignOutButton";

const Header = () => {

    const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-blue-800 ">
        <nav className="w-full p-5 lg:container mx-auto flex items-center justify-between">
            <Link to={"/"}  className="text-lg md:text-2xl text-white font-bold tracking-tight">
                Booknow
            </Link>
            <span className="flex space-x-3">
                {
                    isLoggedIn
                    ? (
                        <div className="flex items-center space-x-2">
                            <Link to={"/my-bookings"} className="hover:bg-slate-200/20 p-2 font-semibold text-sm rounded duration-300 text-white">My Bookings</Link>
                            <Link to={"/my-hotels"} className="hover:bg-slate-200/20 p-2 font-semibold text-sm rounded duration-300 text-white">My Hotels</Link>
                            <SignOutButton />                            
                        </div>
                    )
                    : (
                        <>
                            <Link to={"/sign-in"} className="flex bg-white rounded items-center text-sm text-blue-600 p-2 px-3 font-semibold hover:bg-gray-200 duration-300">Sign in</Link>
                            <Link to={"/sign-up"} className=" focus-visible:ring-blue-600 text-sm ring-1 bg-blue-100/20 hover:bg-blue-100/10 duration-300 ring-blue-800 p-2 px-3 rounded font-semibold text-white">Sign up</Link>
                        </>
                    )
                }
            </span>
        </nav>
    </header>
  )
}

export default Header