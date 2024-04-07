import React from 'react';
import Connect from './Connect';

function Navbar() {
  return (
    <div className="navclass ">
      <nav className="navbar navbar-expand-lg navbar-dark bg-slate-950">
        <div className="container-fluid">
          <h1 className="font-semibold text-white pr-9">KYC3</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>

          <div className="flex-row justify-items-end">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Docs</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link " href="#" role="button" aria-expanded="false">
                  KYC3-SDK
                </a>

              </li>
            </ul>
          </div>
        <Connect />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
