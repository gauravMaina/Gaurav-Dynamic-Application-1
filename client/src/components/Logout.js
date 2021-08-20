import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';
const Logout =()=>{
  //eslint-disable-next-line 
const {state,dispatch}= useContext(UserContext);
    const history = useHistory();

    useEffect(()=>{
      fetch('/logout',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      }).then((res)=>{
        dispatch({type:"USER",payload:false})
        history.push("/login")
      }).catch((error)=>{
          console.log(error);
      })

    });
    return (
        <>
            <h1>This is the Logout Page</h1>
        </>
    );
}
 
export default Logout;