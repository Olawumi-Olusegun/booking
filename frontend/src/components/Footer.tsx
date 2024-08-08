import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-blue-800 py-3">
      <div className=" px-5 lg:container mx-auto flex items-center justify-between">
        <Link to={"/"} className="text-white font-semibold"> BookNow </Link>
        <span className="text-white text-sm font-semibold flex items-center gap-4">
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of Service</Link>
        </span>
      </div>
    </footer>
  )
}

export default Footer