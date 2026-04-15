import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex justify-content-between w-100">
              <div className='d-flex'><li className="nav-item">
                <Link className="nav-link active text-white fs-4" aria-current="page" to="/">{props.title}</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link active text-white fs-4" aria-current="page" to="/about">About</Link>
                </li>
                {token && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active text-white fs-4" aria-current="page" to="/products">Products</Link>
                    </li>
                  </>
                )}
                </div>
              <div>
                {token && (
                  <>
                    <li className="nav-item">
                      <button type="button" className="btn btn-link nav-link text-white fs-4 p-0!" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                )}
                {!token && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active text-white fs-4" aria-current="page" to="/login">Login</Link>
                    </li>
                  </>
                )}
              </div>
            </ul>
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-primary fs-5" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  )
}
