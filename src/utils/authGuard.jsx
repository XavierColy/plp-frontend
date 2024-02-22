import {Outlet, useNavigate} from 'react-router-dom';

export default function AuthGuard(){
    const navigate = useNavigate();

    const value = localStorage.getItem("ALLOWED");
    if (value === "true") {
        return (<Outlet/>);
    }
    else {
        navigate('/login');
    }
}