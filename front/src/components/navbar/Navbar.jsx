import React from 'react'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm" id="mainNav">
            <div className="container px-5">
                <Link className="navbar-brand fw-bold" to={'/'}>Routes App</Link>
                
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
                        <Link to={'/map'} className="nav-item navlink"><a className="nav-link me-lg-3" href="#features">Routing</a></Link>
                        <Link to={'/weather'} className="nav-item navlink"><a className="nav-link me-lg-3" >Weather</a></Link>
                        <Link to={'/form'} className="nav-item navlink"><a className="nav-link me-lg-3" >Incidents feed</a></Link>
                    </ul>
                    <button className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
                        <span className="d-flex align-items-center">
                            <i className="bi-chat-text-fill me-2"></i>
                            <span className="small">Send Feedback</span>
                        </span>
                    </button>
                </div>
            </div>
        </nav>
  )
}

export default Navbar