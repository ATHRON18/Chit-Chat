import React from 'react'
import { IoSettings } from "react-icons/io5";
import { useAuthStore } from '../store/useAuthStore'
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const { authUser, logout } = useAuthStore();


    return (
        <div className="navbar h-[9%] bg-base-100 shadow-sm px-5 border-b border-b-black">
            <div className="navbar-start">
                <div className="dropdown">
                    {authUser && <div tabIndex={0} role="button" className="btn h-[50px] w-[50px] btn-circle m-1">
                        <img className='img border object-cover rounded-full h-full aspect-square ' src={authUser?.profileImg ||"/avatar.png"}  />
                    </div>}
                    <div className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-xs shadow-base-content">
                        <div className="card-body  p-5 h-60">
                            <div className='flex justify-center h-1/2 '>
                                <img 
                                src={authUser?.profileImg ||"/avatar.png"} 
                                className='img border object-cover rounded-full h-full aspect-square '
                                />
                            </div>
                                {authUser && <div className='flex justify-center text-2xl'>Hi,{authUser.fullName}</div>}
                            <Link to="/profile" className=' hover:bg-base-300 flex items-center p-2  text-sm gap-2 rounded-lg ' >
                                <span className='text-lg'><CgProfile /></span>
                                <p>Profile</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-center">
                <Link to="/" className="btn hover:bg-transparent hover:border-0 not-hover:border-0 btn-ghost text-xl">Chit-Chat</Link>
            </div>
            <div className="navbar-end gap-2">
                <div className="tooltip tooltip-bottom" data-tip="Settings">
                    <Link to="/settings" className="btn btn-ghost btn-circle text-xl ">
                        <IoSettings />
                    </Link>
                </div>
                {authUser ?
                    (<div className="tooltip tooltip-bottom" data-tip="Logout">
                        <button onClick={() => { logout() }} className="btn btn-ghost btn-circle text-2xl">
                            <IoLogOutOutline />
                        </button>
                    </div>) : (<button className="btn  btn-ghost btn-circle text-2xl text-gray-400">
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className=" p-2 rounded-full"><IoLogInOutline /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link to="/login">Log In</Link></li>
                                <li><Link to="/signup">Sign Up</Link></li>
                            </ul>
                        </div>
                    </button>)
                }
            </div>
        </div>

    )
}

export default Navbar