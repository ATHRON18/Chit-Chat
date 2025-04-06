import React, { useRef, useState } from 'react'
import { Send, Paperclip, Image, MapPin } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';

const MessageInput = () => {

    const [text,setText] = useState("");
    const [imagePreview,setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {sendMessage} = useChatStore();

    const handleChangeImage = (e)=>{
        const file = e.target.files[0];
        if(!file.type.startsWith("image/")){
            toast.error("Please select an image file");
            return;
        }
        const reader = new FileReader()
        reader.onloadend = ()=>{
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)   
    }

    const removeImage = ()=>{
        setImagePreview(null)
    }
    const handleSendmessage = async(e)=>{
        e.preventDefault();
        if(!imagePreview && !text.trim()) return;
        try {
            await sendMessage({
                messageText : text.trim(),
                messageImage : imagePreview
            })

            setText("");
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.log("Failed to send message:",error)
        }
    }
    const getlocation = ()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setText(`https://www.google.com/maps/place/${position.coords.latitude},${position.coords.longitude}`)
        },()=>{console.log("An error occured to get location")})
    }

  return (
    <form className='h-[8%] border rounded-md flex justify-between items-center px-2 relative'>

        {imagePreview && (
            <div className='absolute bottom-12 '>
                <div className='h-24 w-24 relative flex justify-center items-center'>
                    <img 
                    src={imagePreview} 
                    alt="Preview Img" 
                    className='rounded-lg h-20 w-20 absolute object-cover'
                    />
                    <button
                    onClick={removeImage}
                    className='absolute hover:cursor-pointer bg-zinc-800 right-0 top-0 w-[20px] h-[20px] flex items-center justify-center rounded-full border'
                    >
                    ✕   
                    </button>
                </div>
            </div>
        )}
        
                <div className="dropdown dropdown-top cursor-pointer m-1">
                    <div tabIndex={0} role="button" className="m-1"><Paperclip /></div>
                    <ul tabIndex={0} className=" mb-5 dropdown-content menu bg-base-100 rounded-md z-1 w-52 p-2 shadow-sm border border-accent-content">
                        <input 
                        type="file"
                        ref={fileInputRef}
                        name="messageImage"
                        className='hidden'
                        onChange={handleChangeImage}
                        />
                        <li onClick={()=>{fileInputRef.current?.click()}}>
                            <span ><Image /> Image</span>
                        </li>
                        <li onClick={getlocation}>
                            <a><MapPin />Location</a>
                        </li>
                    </ul>
                </div>

                <input
                type="text"
                placeholder='Type message here..'
                name='messageText'
                className={`${text?.includes("www.google.com/maps/place")?" blur-xs ":""}h-full w-full outline-0 border-0 text-lg  overflow-y-auto`}
                value={text}
                onChange={(e)=>{setText(e.target.value)}}
                />
                <button onClick={handleSendmessage} type='submit' disabled={text||imagePreview?false:true} className='btn-primary btn'><Send /></button>
            </form>
  )
}

export default MessageInput