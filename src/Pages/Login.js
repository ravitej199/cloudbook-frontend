import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
function Login() {

const navigate = useNavigate();
  const [loginUser, setloginUser] = useState({
    email : "",
    password : ""
  })

  let responseMessage= useRef('');


  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setloginUser({
      ...loginUser,
      [name] : value
    })
  }



  const submitToBackend = async (data) =>{
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/auth/login`,{
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(data), 
      })
      
      let res = await response.json();

      if (!response.ok) {
        if (responseMessage.current && responseMessage.current instanceof HTMLElement) {
          responseMessage.current.textContent = res.error;

          setTimeout(() => {
            responseMessage.current.textContent ="";
            
          }, 5000);

        }
      }
      else{
      console.log(res);
      toast.success("Login Successful");
      localStorage.setItem('token',res.token);
      navigate("/notes");

      }
    }catch (error) {
      console.error('Error sending data to backend:', error.message);
    }
  }


  const handleSubmit = (e)=>{
    e.preventDefault();
    if(loginUser.email.length === 0 || loginUser.password.length === 0){

      responseMessage.current.textContent = "Enter the Credentials";

      setTimeout(() => {
        responseMessage.current.textContent = "";
      }, 3000);

    }

    submitToBackend(loginUser)
    setloginUser({
      email : "",
      password : "",
    })
     
    }
    const goBack = () => {
      navigate('/');
    };
  



  return (
    <div className=' flex justify-center items-center flex-col mt-[10%]'>
        <p className='font-semibold text-[60px] my-4'>Login</p>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label text-[20px]">Email address</label>
    <input type="email" name='email' value={loginUser.email} onChange={handleInput} required id='email' className="form-control" placeholder='enter your email' aria-describedby="emailHelp"/>

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-[20px]">Password</label>
    <input type="password" name='password' required className="form-control" id="password" value={loginUser.password} onChange={handleInput} placeholder='enter your email'/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
<p ref={responseMessage} className='text-red-500 mt-3'></p>
<button onClick={goBack} className="bg-[#F8F9FA] absolute rounded-lg -bottom-16 left-[35%]  py-2 px-3 text-[20px] text-black  font-semibold hover:cursor-pointer">
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </button>
    </div>
  )
}

export default Login
