import React,{ useEffect,useState} from 'react';

const Contact =()=>
{
  
  const [userData,setuserData]= useState({name:"",email:"",phone:"",message:""});
  const callContactPage = async ()=>
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
    setuserData({...userData,name:data.name,email:data.email,phone:data.phone});
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
    callContactPage();
    // eslint-disable-next-line
  },[]);
  const HandleInput = (e)=>{
const name = e.target.name;
const value = e.target.value;
setuserData({...userData,[name]:value});
  }
  const Contactform = async ()=>{
      const {name,email,phone,message} = userData;
      const res = await fetch('/contact',{
           method:"POST",
           headers:{
               "Content-Type":"application/json"
           },
           body: JSON.stringify({
            name,email,phone,message
           })
       });
       const data = await res.json();
       if(!data)
       {
      console.log("Message not send");
       }
       else{
           alert("Message is Send ");
           setuserData({...userData,message:""});
       }
  }
return (
<>
    {/* <!--Section: Contact v.2--> */}
<section className="mb-4">

    {/* <!--Section heading--> */}
    <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
    {/* <!--Section description--> */}
    <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

    <div className="row">

        {/* <!--Grid column--> */}
        <div className="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                {/* <!--Grid row--> */}
                <div className="row">

                    {/* <!--Grid column--> */}
                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <input type="text" id="name" name="name" onChange={HandleInput} value={userData.name} placeholder="Your name" className="form-control" />
                        </div>
                    </div>
                    {/* <!--Grid column--> */}

                    {/* <!--Grid column--> */}
                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <input type="text" id="email" name="phone" onChange={HandleInput} value={userData.phone} placeholder="Your Mobile No" className="form-control" />
                        </div>
                    </div>
                    {/* <!--Grid column--> */}

                </div>
                {/* <!--Grid row--> */}

                {/* <!--Grid row--> */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="md-form mb-0">
                            <input type="text" id="subject" name="email" onChange={HandleInput} value={userData.email} placeholder="Your Email " className="form-control" />
                        </div>
                    </div>
                </div>
                {/* <!--Grid row--> */}

                {/* <!--Grid row--> */}
                <div className="row">

                    {/* <!--Grid column--> */}
                    <div className="col-md-12">

                        <div className="md-form">
                            <textarea type="text" id="message" name="message" onChange={HandleInput} value={userData.message}  rows="2"  placeholder="Your message" className="form-control md-textarea"></textarea>
                        </div>

                    </div>
                </div>
                {/* <!--Grid row--> */}

            </form>

            <div className="text-center text-md-left">
                <button type="button" className="btn btn-primary"  onClick={Contactform}>Send</button>
            </div>
            <div className="status"></div>
        </div>
        {/* <!--Grid column--> */}

        {/* <!--Grid column--> */}
        <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
                <li><i className="fas fa-map-marker-alt fa-2x"></i>
                    <p>Pune, 412105, India</p>
                </li>

                <li><i className="fas fa-phone mt-4 fa-2x"></i>
                    <p>+91 7385200907</p>
                </li>

                <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                    <p>cchindiaassociatecommunication@crosscountry.com</p>
                </li>
            </ul>
        </div>
        {/* <!--Grid column--> */}

    </div>

</section>
{/* <!--Section: Contact v.2--></div> */}
</>);
}
export default Contact;