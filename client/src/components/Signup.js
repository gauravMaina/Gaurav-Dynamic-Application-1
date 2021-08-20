import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Signup =()=>
{
  const history = useHistory();
  const [user,setuser]= useState({
    name:"",email:"",phone:" ",work:"",password:"",cpassword:""
  });
  let name;
  let value;

  const HandleInput =(event)=>
  {
    name = event.target.name;
    value = event.target.value;
    setuser({...user ,[name]:value});
  }
  const PostData = async(e)=>
  {
    e.preventDefault();
     const {name,email,phone,work,password,cpassword}=user;
     const res = await fetch("/register",{
     method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
     body:JSON.stringify({
      name,email,phone,work,password,cpassword
     })
     });
     if(res.status === 422 || !res)
     {
      window.alert("Registration  Not Done");
      console.log("Registration Not Done");
     }
     else{
      window.alert("Registration Successfully Done");
      console.log("Registration Successfully Done")
      history.push("/login");
     }
  }
return (
<><section className="vh-100 bg-image" style={{backgroundImage: new URL ('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.jpg')}}>
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: "15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>
              <form method="POST">
                <div className="form-outline mb-4">              
                 <input type="text" id="name" className="form-control form-control-lg" name="name" value={user.name} onChange={HandleInput} placeholder="Enter Your Name" />
                </div>
                <div className="form-outline mb-4">
                  <input type="email" id="email" className="form-control form-control-lg" name="email" value={user.email} onChange={HandleInput} placeholder="Your Email" />          
                </div>
                
                <div className="form-outline mb-4">              
                 <input type="number" id="phone" className="form-control form-control-lg" name="phone" value={user.phone} onChange={HandleInput} placeholder="Enter Your Phone" />
                </div>
                <div className="form-outline mb-4">              
                 <input type="text" id="work" className="form-control form-control-lg" name="work" value={user.work} onChange={HandleInput} placeholder="Enter Your Profession" />
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="password" className="form-control form-control-lg" name="password" value={user.password} onChange={HandleInput} placeholder="Password" />
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="cpassword" className="form-control form-control-lg" name="cpassword" value={user.cpassword} onChange={HandleInput} placeholder="Confirm Password" />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={PostData}>Register</button>
                </div>
                <div>
                <p className="text-center text-muted mt-5 mb-0">Have already an account? <NavLink to="/login" className="fw-bold text-body"><u>Login here</u></NavLink></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
);
}
export default Signup;