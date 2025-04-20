import React, { useEffect } from 'react'
import { useState } from 'react'
import { TbPin } from "react-icons/tb";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { AlignRight, Search, Frown } from 'lucide-react';
import { FaUserPlus } from "react-icons/fa6";
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';


const Sidebar = () => {
    const { users, getUsers, selectedUser, setSelectedUser } = useChatStore()

    const { onlineUser } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers, onlineUser, selectedUser])


    const [showOnlineUsers, setShowOnlineUsers] = useState(false)
    const [showSearchUser, setShowSearchUser] = useState("")

    return (
        <aside className={`border-r p-1.5 border-r-gray-900 h-full overflow-y-auto ${selectedUser?._id ? "hidden sm:w-1/4  sm:block" : "w-full sm:w-1/4"} `}>

            {/* searchBArr */}
            <div className='flex flex-col gap-2 mb-2 shrink'>
                <div className='flex justify-between text-primary items-center'>
                    <h4 className='text-2xl font-bold'>Chats</h4>
                    <div className='flex items-center'>
                        <button className="btn btn-ghost btn-circle text-xl text-base-content tooltip tooltip-bottom" data-tip="Add Friend" onClick={() => document.getElementById('addFriend').showModal()}><FaUserPlus /></button>
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id="addFriend" className="modal">
                            <div className="modal-box p-2 rounded-md">
                                <form method="dialog" id='myForm' className='relative py-7 px-3 bg-base-100/20 ' >

                                    <span onClick={() => { document.getElementById("myForm").submit() }} className="absolute btn flex justify-center items-center h-[40px] w-[40px] p-3 cursor-pointer rounded-full  btn-ghost  right-0.5 top-0.5 font-extrabold text-xl">✕</span>
                                    <h3 className='text-2xl'>Enter your friend's email..!</h3>
                                    <div className='flex h-[30px] w-full justify-between mt-8'>
                                        <input onChange={(e) => setShowSearchUser(e.target.value)} value={showSearchUser} className='w-[80%] px-2 rounded-md' type="email" placeholder='E.g.- athron@gmail.com' id="" />
                                        <span className='btn h-[30px] rounded-sm'>Search</span>
                                    </div>
                                </form>
                                {showSearchUser && (
                                    <>
                                        {users?.map((user) =>
                                            user.email.includes(showSearchUser) ? (
                                                <div key={user.email}>{user.fullName}</div>
                                                // console.log("true : ",user.fullName)
                                                
                                            ) : (
                                                <div key={user.email}>No one Found with this email..!</div>
                                                // console.log("false : ")
                                            )
                                        )}
                                    </>
                                )}

                            </div>
                        </dialog>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1"><AlignRight /></div>
                            <ul tabIndex={0} className="dropdown-content border border-accent-content menu bg-base-100 rounded-md z-1 w-52 p-2 shadow-sm">
                                <li className='opacity-40'><a className='hover:cursor-not-allowed'><TbPin className='text-2xl ' />Pin someone</a></li>
                                <li onClick={() => { setShowOnlineUsers(!showOnlineUsers) }}><a> <MdOutlineMarkUnreadChatAlt className='text-xl' />{showOnlineUsers ? "Hide online users" : "Show online users"}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <div className='h-[30px] rounded-md border flex items-center'>
                    <Search className='h-[20px] p-0.5' />
                    <input type="search" placeholder='Search contact' className='h-full w-full rounded-md outline-0  border-0' />
                </div> */}
            </div>

            {/* map used here */}
            {users && (
                <>
                    {showOnlineUsers
                        ?
                        (onlineUser?.length === 1
                            ?
                            <h3 key={1} className='h-[50%] w-full flex flex-col items-center justify-end text-2xl '>
                                <Frown className='w-9 h-9 animate-bounce' />
                                <p className='animate-pulse'>There is no one online</p>
                            </h3>
                            :
                            (users
                                .filter(user => onlineUser.includes(user._id))
                                .map(user => (
                                    <button key={user._id} onClick={() => { setSelectedUser(user) }} className={`px-4 rounded-md h-[70px] w-full hover:bg-base-200 ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""} `} >
                                        <div className='flex items-center gap-3 w-full'>
                                            <div className='shrink-0 relative'>

                                                <img src={user.profileImg === "/uploads/user_default.jpg" ? "/avatar.png" : user.profileImg} className='h-[55px] w-[55px] object-cover rounded-full cursor-pointer ' />
                                                {onlineUser?.includes(user._id) && (
                                                    <span className='absolute rounded-full size-3 bottom-0 right-0 bg-green-500 ring-1 ring-zinc-500' />
                                                )}

                                            </div>
                                            <div className='w-[65%] flex  flex-col items-start gap-0.5 cursor-default overflow-x-hidden'>
                                                <h4 className='text-xl h-[65%] font-semiboldbold overflow-hidden text-ellipsis whitespace-nowrap '> {user.fullName}</h4>
                                                <div className='text-sm max-h-[35%] overflow-hidden text-zinc-500 whitespace-nowrap '>{onlineUser?.includes(user._id) ? "Online" : "Offline"}</div>
                                            </div>
                                            {/* <div className=' hidden md:flex  h-[60px]  items-start cursor-default'>14:56</div> */}
                                        </div>
                                    </button>
                                ))
                            )
                        )

                        :

                        users.map(user => (<button key={user._id} onClick={() => { setSelectedUser(user) }} className={`px-4 rounded-md h-[70px] w-full hover:bg-base-200   ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""} `} >
                            <div className='flex items-center gap-3 w-full'>
                                <div className='shrink-0 relative'>

                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}

                                    <img src={!user?.profileImg ? "/avatar.png" : user.profileImg} className='h-[55px] w-[55px] object-cover rounded-full cursor-pointer ' />
                                    {onlineUser?.includes(user._id) && (
                                        <span className='absolute rounded-full size-3 bottom-0 right-0 bg-green-500 ring-1 ring-zinc-500' />
                                    )}

                                </div>
                                <div className='w-[65%] flex  flex-col items-start gap-0.5 cursor-default overflow-x-hidden'>
                                    <h4 className='text-xl h-[65%] font-semiboldbold overflow-hidden text-ellipsis whitespace-nowrap '> {user.fullName}</h4>
                                    <div className='text-sm max-h-[35%] overflow-hidden text-zinc-500 whitespace-nowrap '>{onlineUser?.includes(user._id) ? "Online" : "Offline"}</div>
                                </div>
                                {/* <div className=' hidden md:flex  h-[60px]  items-start cursor-default'>14:56</div> */}
                            </div>
                        </button>))
                    }
                </>
            )}
        </aside>

    )
}

export default Sidebar