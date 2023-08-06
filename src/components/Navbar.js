import React, { useContext, useRef } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { logo } from "./img/logo45.png"
import logo1 from "../img/logo45.png"

import Avatar from '@mui/material/Avatar';
import bookContext from '../context/books/bookContext';

const Navbar = (props) => {
    const context = useContext(bookContext)
    const { user, removeUser } = context;

    let location = useLocation();

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')
        removeUser()
        navigate('/login');
        props.showAlert("Logout successfully", "success")

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {localStorage.getItem('token') ? <Avatar style={{ backgroundColor: 'rgb(57 88 113)' }} id="logo">{user}</Avatar> : <Avatar id="logo"></Avatar>}
                {/* <img id="logo" src={logo1} alt="Myonlinemeal.com" /> */}
                <Link className="navbar-brand" to="/">Library</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        {localStorage.getItem('token') &&
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/allissuebook" ? "active" : ""}`} to="/allissuebook">Books</Link>
                            </li>
                        }
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form> : <button onClick={handleLogout} className='btn btn-outline-primary'>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
