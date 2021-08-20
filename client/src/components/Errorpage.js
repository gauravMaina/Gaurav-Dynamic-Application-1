import React from 'react';
import { NavLink } from 'react-router-dom';
const ErrorPage =()=>
{
return(<>
    <div id="particles-js">
  <canvas class="particles-js-canvas-el"  style={{width:"100%",height:"100%"}}>
  </canvas>
</div>
 
<div class="container">
  <div class="text">
    <h1 style={{textShadow: "-2px 0 0 rgba(255,0,0,.7),"}}> ERROR 404 </h1>
    <p> <NavLink exact to="/">go back</NavLink></p>
  </div>
</div>
</>);
}
export default ErrorPage;