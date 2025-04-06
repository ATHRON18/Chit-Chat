import React, { useEffect } from 'react'
import { useState } from 'react'
import { TbPin } from "react-icons/tb";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { AlignRight, Search, Frown } from 'lucide-react';
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';


const Sidebar = () => {
    const { users, getUsers, selectedUser, setSelectedUser } = useChatStore()

    const { onlineUser } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers, onlineUser, selectedUser])

    const [showOnlineUsers, setShowOnlineUsers] = useState(false)

    return (
        <aside className={`border-r p-1.5 border-r-gray-900 h-full overflow-y-auto ${selectedUser?._id ? "hidden sm:w-1/4  sm:block" : "w-full sm:w-1/4"} `}>

            {/* searchBArr */}
            <div className='flex flex-col gap-2 mb-2 shrink'>
                <div className='flex justify-between text-primary'>
                    <h4 className='text-2xl font-bold'>Chats</h4>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1"><AlignRight /></div>
                        <ul tabIndex={0} className="dropdown-content border border-accent-content menu bg-base-100 rounded-md z-1 w-52 p-2 shadow-sm">
                        <li className='opacity-40'><a className='hover:cursor-not-allowed'><TbPin className='text-2xl ' />Pin someone</a></li>
                        <li onClick={()=>{setShowOnlineUsers(!showOnlineUsers)}}><a> <MdOutlineMarkUnreadChatAlt className='text-xl' />{showOnlineUsers?"Hide online users":"Show online users"}</a></li>
                        </ul>
                    </div>
                </div>
                {/* <div className='h-[30px] rounded-md border flex items-center'>
                    <Search className='h-[20px] p-0.5' />
                    <input type="search" placeholder='Search contact' className='h-full w-full rounded-md outline-0  border-0' />
                </div> */}
            </div>

            {/* map used here */}
            {users &&
                users.map((user, index) => {
                    return (
                        showOnlineUsers ?
                            (onlineUser.includes(user._id) ?
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
                                :
                                <h3 key={1} className='h-[50%] w-full flex flex-col items-center justify-end text-2xl '>
                                    <Frown className='w-9 h-9 animate-bounce' />
                                    <p className='animate-pulse'>There is no one online</p>
                                </h3>) :

                            (<button key={user._id} onClick={() => { setSelectedUser(user) }} className={`px-4 rounded-md h-[70px] w-full hover:bg-base-200   ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""} `} >
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

                })}
        </aside>

    )
}

export default Sidebar