import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast from "react-hot-toast"
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

const SignupPage = () => {

  const { isSigningUp, signup } = useAuthStore()

  const [input, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",

  })

  const [showPass, setShowPass] = useState(false)

  const validateForm = () => {
    if (!input.fullName) return toast.error("Full name is required!");

    if (!input.email) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(input.email)) return toast.error("Enter a valid email!");

    if (!input.password) return toast.error("Password is required!");
    if (input.password.length < 6) return toast.error("Password must be at least 6 characters long!");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true)
      signup(input)
  }

  return (
      <div className="hero bg-base-200  h-full">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <p className="py-6">
            New here? You're just a few clicks away from joining the conversation! Sign up now to meet new people, share your thoughts, and never miss another moment of the fun.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body " onSubmit={handleSubmit}>
              <div className="fieldset text-sm">
                <label className="fieldset-label">Name</label>
                <input type="text" className="input" placeholder="Full Name"
                  value={input.fullName} onChange={(e) => { setInputs({ ...input, fullName: e.target.value }) }} />
              </div>

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
              {/* <div className="fieldset text-sm">
                  <label className="fieldset-label">Confirm Password</label>
                  <input type="password" className="input" placeholder="Password" 
                  value={input.confirmPassword} onChange={(e)=>{setInputs({...input,confirmPassword:e.target.value})}}/>
                </div> */}

              <div><Link to="/login" className="link link-hover">Already have an account? </Link> </div>

              <div className="fieldset text-sm">
                <button className="btn btn-neutral mt-4" disabled={isSigningUp} >
                  {isSigningUp ? <div><span className="loading loading-dots loading-lg"></span></div> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default SignupPage