import {create} from "zustand"
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set,get)=>({
    messages : [],
    users : [],
    selectedUser : null,
    isGettingUsers : false,
    isGettingMessages : false,
    // isSendingMessages : false,
    
    getUsers : async()=>{
        set({isGettingUsers : true});
        try {
            const res = await axiosInstance.get("/api/users");
            set({users : res.data});
            
        } catch (error) {
            toast.error(error.response.data)
        }finally{
            set({isGettingUsers : false})
        }
    },
    
    getMessages : async(user)=>{
        set({isGettingMessages : true})
        try {
            const res = await axiosInstance.get(`/api/users/${user._id}`);
            set({messages : res.data})
        } catch (error) {
            toast.error(error.response.data)
        }finally{
            set({isGettingMessages : false});
        }
    },

    setSelectedUser : (selectedUser)=>{set({selectedUser})},

    sendMessage : async(messageData)=>{
        const {selectedUser,messages} = get();
        try {
            set({isSendingMessages : true});
            const res = await axiosInstance.post(`/api/users/${selectedUser._id}`,messageData);
            set({messages : [...messages,res.data]});
            
        } catch (error) {
            toast.error(error.response.data)
        }finally{
            set({isSendingMessages : false})
        }
    },

    subscribeToMessages : ()=>{
        const {selectedUser} = get();
        if(!selectedUser) return;
        
        const socket = useAuthStore.getState().socket;
            socket.on("newMessage",(newMessage)=>{
                set({messages : [...get().messages,newMessage]});
            })
    },
    
    unsubscribeToMessages : ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
}))