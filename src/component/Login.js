import React from "react";
function Login(){
    return(
        <>
        <div className="container m-5" style={{width:"50%",height:"35%"}}>
            <h1 className="m-5">Login</h1>
            <div className="form-floating mb-3 m-5 my-5">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating m-5 my-5">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary m-5 my-5">Sign in</button>
            </div>
        </div>
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src="..." className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                <img src="..." className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                <img src="..." className="d-block w-100" alt="..."/>
                </div>
            </div>
        </div>
        </>
    );
}
export default Login