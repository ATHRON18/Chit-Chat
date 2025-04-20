import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import NoConversation from './NoConversation';
import MessageInput from './MessageInput';
import {formatTime} from '../lib/utils';
import { FaLocationDot } from "react-icons/fa6";


const ChatContainer = () => {

    const {selectedUser, setSelectedUser, getMessages, messages, subscribeToMessages, unsubscribeToMessages} = useChatStore()
    const {authUser, onlineUser } = useAuthStore();

    const chatScrollRef = useRef(null);

    const [showDP,setShowDP] = useState({})

    const showProfileImg =(user)=>{
        setShowDP(user)
        document.getElementById('showProfileImg').showModal();
    }

    useEffect(() => {

        getMessages(selectedUser);
        subscribeToMessages();
        return ()=>unsubscribeToMessages();

    }, [selectedUser._id,getMessages,subscribeToMessages,unsubscribeToMessages])

    useEffect(() => {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;  
    }, [messages]);

    return (
        <div className={`sm:w-3/4 h-full w-full  p-1   flex flex-col gap-1`}>
            {/* top */}
            <div className='px-1  h-[9%] flex gap-3 justify-between items-center border-b border-base-300'>
                <div className='flex gap-3'>
                    <div className='h-[50px] w-[50px] '>
                        <img src={selectedUser.profileImg || "/avatar.png"}  onClick={(e) => showProfileImg(selectedUser)} className='h-[50px] w-[50px] object-cover rounded-full cursor-pointer ' />
                        {showDP &&
                                    <dialog id="showProfileImg" className="modal">
                                        <div className="modal-box  p-1 rounded-md h-fit w-fit">  
                                            <div className='h-full'>
                                                <form className='flex justify-between w-[350px] sm:w-[500px] absolute px-3 bg-base-100/20' id='myForm' method="dialog">
                                                <div className="font-bold  text-xl  p-2 ">{showDP.fullName}</div>
                                                <span onClick={()=>{document.getElementById("myForm").submit(); setShowDP(!showDP)}}  className=" btn flex justify-center items-center h-[40px] w-[40px] p-3 cursor-pointer rounded-full  btn-ghost  right-2 top-0.5 font-extrabold text-xl">✕</span>
                                            </form>
                                                <img className="h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] object-cover cursor-zoom-in" src={!showDP.profileImg?"/avatar.png":showDP.profileImg} />
                                            </div>
                                        </div>
                                    </dialog>
                                }
                    </div>
                    <div className=' flex flex-col  cursor-default'>
                        <h4 className='text-xl h-[60%] font-semiboldbold overflow-hidden text-ellipsis whitespace-nowrap '> {selectedUser.fullName}</h4>
                        <div className='text-sm  overflow-hidden text-zinc-500 whitespace-nowrap '>{onlineUser?.includes(selectedUser._id) ? "Online" : "Offline"}</div>
                    </div>
                </div>
                <div onClick={() => { setSelectedUser(null) }} className='h-[50px] w-[50px] rounded-full hover:cursor-pointer flex items-center justify-center'>✕</div>
            </div>

            {/* Mid */}
            <div ref={chatScrollRef} className='h-[84%] pt-0.5 overflow-y-auto '>
                {messages[0] ?
                    messages.map((message) => {
                            return (
                                <div key={message._id} className={`chat ${message.senderId===selectedUser._id?"chat-start" : "chat-end "}`}>
                                    <div className="chat-image avatar">
                                        <div className="sm:w-10 w-0  rounded-full ">
                                            <img
                                                alt="ProfileImage"
                                                src={message.senderId===selectedUser._id?selectedUser.profileImg || "/avatar.png": authUser.profileImg || "avatar.png"} />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {message.senderId===selectedUser._id?selectedUser.fullName: "You"}
                                    </div>
                                    <div className={`chat-bubble flex flex-col shadow-sm  ${message.senderId===selectedUser._id?"bg-base-200 " : "bg-primary/80 shadow-sm text-primary-content"} ${message.messageImage? "w-[fit]" : "lg:max-w-[65%] "}`}>
                                        {message.messageImage && (
                                        <img src={message.messageImage}
                                         alt='Attachment'
                                         className='h-[200px] w-[350px] object-cover rounded-xl  '
                                        />
                                        )} 
                                        {message.messageText &&(
                                            message.messageText?.includes("www.google.com")?
                                            <a target='_blank' href={message.messageText} className="underline  text-blue-800 flex flex-col items-center"> <FaLocationDot className='text-3xl' /> <p>Current location</p> </a> : <p href={message.messageText} className={message.messageImage? "max-w-[300px]" : ""}>{message.messageText}</p>
                                        )}
                                    </div>
                                    <div className="chat-footer opacity-50">
                                        {message.senderId===selectedUser._id?"": "Delivered"}
                                        <time className="text-xs opacity-80">
                                            {formatTime(message.createdAt)}
                                        </time>
                                    </div>
                                </div>
                            )
                    })
                    : <NoConversation/> 
                }
            </div>

            {/* bottom */}
            <MessageInput/>
            
        </div>
    )
}

export default ChatContainer