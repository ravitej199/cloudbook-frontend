import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email : "",
    password : ""
  });

  const [errors,Seterrors] = useState([]);

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/auth/register`, {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(data), // Convert data to JSON string
      });
      const res_data = await response.json();

      if (!response.ok) {

        console.log(res_data.errors)
      Seterrors(res_data.errors);

      setTimeout(() => {
        Seterrors([]);
        
      }, 9000);

        
      }
      else{

      toast.success("Registration Successful ");
      localStorage.setItem('token',res_data.token);
      navigate("/notes");

      }

      setUser({
        username :"",
        email : "",
        password: "",

      });

      if(res_data.ok){
        
      navigate("/notes");

      }
  
    } catch (error) {
      console.error('Error sending data to backend:', error.message);
    }
  };
 

  
  const handleInput = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name] : value,
    })
    console.log(user.username);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    sendDataToBackend(user);}

    
    const goBack = () => {
      navigate(-1);
    };


  return (
    <div className=' flex justify-center items-center flex-col mt-16'>
    <p className='font-semibold text-[40px] my-4'>Register</p>
  <form onSubmit={handleSubmit}>
  <div className="mb-3">
<label htmlFor="username" className="form-label">Username</label>
<input type="text" name='username' value={user.username} onChange={handleInput} required  className="form-control" id="username"  placeholder="Enter your username"/>
</div>
<div className="mb-3">
<label htmlFor="email" className="form-label">Email address</label>
<input type="email" className="form-control" id="email" name='email' value={user.email} onChange={handleInput} required aria-describedby="emailHelp"/>
<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
<label htmlFor="password" className="form-label">Password</label>
<input type="password" className="form-control" id="password" name='password' value={user.password} onChange={handleInput} required/>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
<div className='mt-2 error-list'>
{errors.map((error)=>{
 return <p key={error.index} className='text-red-500'>{error.msg}</p>
})}

</div>

<button onClick={goBack} className="bg-[#F8F9FA] absolute rounded-lg -bottom-16 left-[35%]  py-2 px-3 text-[20px] text-black  font-semibold hover:cursor-pointer">
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </button>
</div>
  )
}

export default Register
