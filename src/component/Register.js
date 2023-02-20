import React from "react";
function Register(){
    return(
        <>
        <div className="container position-absolute top-50 start-50 translate-middle" style={{width:"75%"}}>
        <form className="row g-3">
            <div className="col-12">
                <label for="validationDefault01" className="form-label">First name</label>
                <input type="text" className="form-control" id="validationDefault01" required/>
            </div>
            <div className="col-12">
                <label for="validationDefault02" className="form-label">Last name</label>
                <input type="text" className="form-control" id="validationDefault02" required/>
            </div>
            <div className="col-12">
                <label for="validationDefaultUsername" className="form-label">Username</label>
                <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend2">@</span>
                <input type="text" className="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required/>
                </div>
            </div>
            <div className="col-12">
                <label for="validationDefaultPassword" className="form-label">Password</label>
                <input type="Password" className="form-control" id="validationDefaultPassword"  aria-describedby="inputGroupPrepend2" required/>
                
            </div>
            <div className="col-md-6">
                <label for="validationDefault03" className="form-label">City</label>
                <input type="text" className="form-control" id="validationDefault03" required/>
            </div>
            <div className="col-md-3">
                <label for="validationDefault04" className="form-label">State</label>
                <select className="form-select" id="validationDefault04" required>
                <option selected disabled value="">Choose...</option>
                <option>...</option>
                </select>
            </div>
            <div className="col-md-3">
                <label for="validationDefault05" className="form-label">Zip</label>
                <input type="text" className="form-control" id="validationDefault05" required/>
            </div>
            <div className="col-12">
                <button className="btn btn-primary" type="submit">Register</button>
            </div>
        </form>
        </div>
        </>
    )
}
export default Register;