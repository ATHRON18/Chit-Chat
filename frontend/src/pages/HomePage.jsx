import React  from 'react'
import { useChatStore } from '../store/useChatStore'
import { Send, Paperclip, Image, MapPin } from 'lucide-react';

import Sidebar from '../components/Sidebar';
import NotChatSelected from '../components/NotChatSelected';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
  const { selectedUser } = useChatStore()

 
  return (
    <div className='container flex flex-row h-[91%] min-w-full '>
      {/* left */}
      <Sidebar />

      {/* right */}
      {!selectedUser? <NotChatSelected /> : <ChatContainer/>}
      

    </div>
  )
}

export default HomePage