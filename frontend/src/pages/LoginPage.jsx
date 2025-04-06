import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast"



const LoginPage = () => {
  const [showPass, setShowPass] = useState(false)
  const { login,isLoggingIn } = useAuthStore();

  const [input, setInputs] = useState({
    email: "",
    password: "",
  })

  const validateForm = () => {

    if (!input.email) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(input.email)) return toast.error("Enter a valid email!");

    if (!input.password) return toast.error("Password is required!");
    if (input.password.length < 6) return toast.error("Password must be at least 6 characters long!");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true)
      login(input)
  }

  return (
      <div className="hero bg-base-200 h-full">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
            Welcome back! Your friends are waiting, the conversations are flowing, and all that's missing is you. Log in now to pick up right where you left off.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset ">
                <div className="fieldset text-sm">
                  <label className="fieldset-label">Email</label>
                  <input type="email" className="input" placeholder="Email"
                    value={input.email} onChange={(e) => { setInputs({ ...input, email: e.target.value }) }} />
                </div>
                <div className="fieldset text-sm">
                  <label className="fieldset-label ">Password</label>
                  <div className="input p-0">
                    <input type={showPass ? "text" : "password"} placeholder="Password"
                      value={input.password} className='pl-3' onChange={(e) => { setInputs({ ...input, password: e.target.value }) }} />
                    <span onClick={() => { setShowPass(!showPass) }} className='hover:cursor-pointer p-2 ' >
                      {showPass ? <IoEyeOffSharp className=' text-xl text-gray-600' /> : <IoEyeSharp className=' text-xl text-gray-600' />}
                    </span>
                  </div>
                </div>
                <div><a className="link link-hover">Forgot password?</a></div>
                <button onClick={(e) => {handleSubmit(e)}} className="btn btn-neutral mt-4">
                {isLoggingIn ? <div><span className="loading loading-dots loading-lg"></span></div> : "Login"}
                  </button>
                <div className='text-sm'>New to Chit-Chat? <Link to="/signup" className="link link-hover  text-teal-600">Sign Up</Link></div>

              </fieldset>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default LoginPage