import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"

const MainLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh">
        <Header />
            <main>
                <Outlet />
            </main>
        <Footer />
    </div>
  )
}

export default MainLayout