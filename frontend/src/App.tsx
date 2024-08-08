import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import AuthLayout from "./layouts/AuthLayout"
import AddHotels from "./pages/AddHotels"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import HotelDetails from "./pages/HotelDetails"
import Booking from "./pages/Booking"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />

          <Route  element={<AuthLayout />}>
            <Route path="/my-hotels" element={<MyHotels />} />
            <Route path="/add-hotel" element={<AddHotels />} />
            <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
            <Route path="/hotel/:hotelId/booking" element={<Booking />} />
          </Route>
          
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:hotelId" element={<HotelDetails />} />

          <Route path="*" element={<Navigate to={"/"} />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
