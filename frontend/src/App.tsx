import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import AuthLayout from "./layouts/AuthLayout"
import AddHotels from "./pages/AddHotels"

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
            <Route path="/add-hotel" element={<AddHotels />} />
          </Route>

          <Route path="*" element={<Navigate to={"/"} />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
