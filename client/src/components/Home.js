import React,{ useEffect , useState } from 'react';
const Home =()=>
{
    const [userName,setUserName]= useState("");
    const [show,setShow]= useState(false)
    const callHomePage = async ()=>
    {
      try 
      {  
      const res = await fetch('/getData',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data= await res.json();
      console.log(res.status);
      console.log(data);
      setUserName(data.name);
      console.log(userName)
      setShow(true);
      // setuserData(data);
      if(res.status ===404)
      {
        const error = new Error(res.error);
        throw error;
      }
      
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(()=>{
      callHomePage();
      // eslint-disable-next-line
    },[]);
return (
    <><h4>Welcome </h4>
    <h6 >{userName}</h6>
<h5>{show ? "Happy, to see you back " :" We Are the mern Devloper "}</h5>
</>);
}
export default Home;