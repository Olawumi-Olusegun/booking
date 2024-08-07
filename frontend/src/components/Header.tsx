import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import SignOutButton from "./SignOutButton";

const Header = () => {

    const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-blue-800 ">
        <nav className="w-full p-5 md:container mx-auto flex items-center justify-between">
            <Link to={"/"}  className="text-3xl text-white font-bold tracking-tight">
                BookNow
            </Link>
            <span className="flex space-x-3">
                {
                    isLoggedIn
                    ? (
                        <div className="flex items-center space-x-3">
                            <Link to={"/my-hotels"} className=" text-white">My Bookings</Link>
                            <Link to={"/add-hotel"} className=" text-white">My Hotels</Link>
                            <SignOutButton />                            
                        </div>
                    )
                    : (
                        <>
                            <Link to={"/sign-in"} className="flex bg-white rounded items-center text-blue-600 px-6 py-2 font-bold hover:bg-gray-200 duration-300">Sign In</Link>
                            <Link to={"/sign-up"} className=" focus-visible:ring-blue-600 ring-2 ring-white px-6 py-2 rounded font-bold text-white">Sign Up</Link>
                        </>
                    )
                }
            </span>
        </nav>
    </header>
  )
}

export default Header