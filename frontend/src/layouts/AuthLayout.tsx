import { useAppContext } from '../context/AppContext'
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const { isLoggedIn } = useAppContext();
    return isLoggedIn ? <Outlet /> : <Navigate to={"/"} />
}

export default AuthLayout