import React from 'react'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from 'react-router-dom'


const Navbar = () => {
    const navigate= useNavigate();
    const redirectToTraffic = () => {
        // Use window.location.href to redirect to localhost:8080/traffic.html
        window.location.href = 'http://localhost:8081/traffic.html';
    };
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm" id="mainNav">
            <div className="container px-5">
                <Link className="navbar-brand fw-bold" to={'/'}>Routes App</Link>
                
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
                        <Link to={'/map'} className="nav-item navlink"><a className="nav-link me-lg-3" href="#features">Routing</a></Link>
                        <Link to={'/weather'} className="nav-item navlink"><a className="nav-link me-lg-3" >Weather</a></Link>
                        <Link to={'/form'} className="nav-item navlink"><a className="nav-link me-lg-3" >Incidents feed</a></Link>
                        <Link
                        onClick={redirectToTraffic}
                        className="nav-item navlink"><a className="nav-link me-lg-3" >Traffic and Incidents</a></Link>
                    </ul>
                
                    <button onClick={()=>{navigate('/feedback')}} className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
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