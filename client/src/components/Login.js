import React,{ useContext, useState } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { UserContext } from '../App'
const Login =()=>
{// eslint-disable-next-line 
  const {state,dispatch} = useContext(UserContext);
  const history = useHistory();
  const [email ,setEmail] = useState();
  const [password,setPassword] = useState();
  const UserLogin = async ()=>
  {  
   const res= await fetch("/signin",{
     method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
     body: JSON.stringify({
      email,
      password
    })
   });
   console.log(res.status);
   if(res.status ===400 || !res)
   {
     window.alert("Invalid Credential");
   }
   else
   {
     dispatch({type:"USER",payload:true});
     window.alert("Login Successfully");
     history.push('/');
   }
  }
return (<>
    <section className="vh-100 bg-image" style={{backgroundImage: new URL ('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.jpg')}}>
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: "15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Sign in</h2>
              <form method="POST">
                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" value={email} onChange={(e)=>setEmail( e.target.value)} placeholder="Your Email" />          
                </div>
                
                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" value={password} onChange={(e)=>setPassword( e.target.value)} placeholder="Password" />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={UserLogin}>Login</button>
                </div>
                <p className="text-center text-muted mt-5 mb-0">Create an account? <NavLink to="/signup" className="fw-bold text-body"><u>Register here</u></NavLink></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</>);
}
export default Login;