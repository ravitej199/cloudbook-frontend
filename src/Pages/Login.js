import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/Notes/noteContext';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
function Login() {

const {setLoggedIn} = useContext(NoteContext)

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
      setLoggedIn(true);

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
    <div className=' flex justify-center items-center flex-col  px-4 min-h-screen '>
        <p className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-4'>Login</p>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
  <div className="mb-4">
    <label htmlFor="email" className="form-label text-lg sm:text-xl md:text-2xl">Email address</label>
    <input type="email" name='email' value={loginUser.email} onChange={handleInput} required id='email' className="form-control w-full px-3 py-2 border rounded-md text-base" placeholder='enter your email' aria-describedby="emailHelp"/>

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-lg sm:text-xl md:text-2xl">Password</label>
    <input type="password" name='password' required className="form-control form-control w-full px-3 py-2 border rounded-md text-base" id="password" value={loginUser.password} onChange={handleInput} placeholder='enter your email'/>
  </div>
  <div className="buttons flex flex-col sm:flex-row justify-between mt-6 gap-4">
  <button onClick={goBack} className="bg-gray-200 rounded-lg py-2 px-4 text-lg text-black font-semibold hover:bg-gray-300 transition duration-200">
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </button>
  <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 px-4 text-lg font-semibold hover:bg-blue-700 transition duration-200" >Submit</button>
  
  </div>
</form>
<p ref={responseMessage} className='text-red-500 mt-3'></p>

    </div>
  )
}

export default Login
