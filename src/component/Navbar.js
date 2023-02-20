import React from "react";
function Navbar(){
    return(
        <>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                <img src="favicon-32x32.png" alt="Logo" width="30" height="24" className="d-inline-block rounded align-text-top"/>
                <span className="m-5">Student's Store</span>
                </a>
            </div>
            </nav>
        </>
    );
}
export default Navbar