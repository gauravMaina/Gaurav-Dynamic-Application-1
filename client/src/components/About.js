import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ceo from '../images/ceo.jpg'
const About =()=>
{
  const history = useHistory();
  
  const [userData,setuserData]= useState("");
  const callAboutPage = async ()=>
  {
    try 
    {  
    const res = await fetch('/about',{
      method:"GET",
      headers:{
        Accept: "application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    });
    const data= await res.json();
    console.log(res.status);
    console.log(data);
    setuserData(data);
    // setuserData(data);
    if(res.status ===404)
    {
      const error = new Error(res.error);
      throw error;
    }
    
    } catch (error) {
      console.log(error);
      history.push("/login");
    }
  }
  
  useEffect(()=>{
    callAboutPage();
    // eslint-disable-next-line
  },[]);
return (<>
    <div className="about-section">
    
  <h1>About Us Page</h1>
</div>
<form method="GET">
<h2 style={{textAlign:"center"}}>Our Team</h2>
<div className="row">
  <div className="column">
    <div className="card">
      <img src={ceo} alt="Kevin" />  
        <h2>Kevin clark</h2>
        <h3 className="title">CEO & Founder</h3>
        <h3>User Id:{userData._id}</h3>
        <h3>Name:{userData.name}</h3>
        <h3>Email:{userData.email}</h3>  
        <h3>Dasignation:{userData.work}</h3>
        <h3>MobileNo:{userData.phone}</h3>
        <h3><button className="button">Edit</button></h3>
    </div>
  </div>
</div>
<p>{userData.name}</p>
</form>
</>);
}
export default About;