import {create} from "zustand"
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast"
import io from "socket.io-client"

const BASE_URL = import.meta.env.MODE ==="development" ? "http://localhost:5500":"/";

export const useAuthStore = create((set,get)=>({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isCheckingAuth : true,
    isUpdatingProfile : false,
    socket : null,
    onlineUser : [], 

    checkAuth : async()=>{
        try {
            const res = await axiosInstance.get("/api/check")
            set({authUser : res.data})
            get().connectSocket();
        } catch (error) {
            console.log("Error  in checkauth : ",error.message);
            set({authUser : null})
        } finally {
            set({isCheckingAuth : false})
        }
    },

    signup : async (data)=>{
        set({isSigningUp : true});
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser : await res.data});
            toast.success("Account created successfully")
            get().connectSocket();
        } catch (error) {
            console.log("Error in signup : ",error);
            toast.error(error.response.data)
            
        } finally{
            set({isSigningUp : false})
        }
    },

    login : async(data)=>{
        set({isLoggingIn : true});
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser : res.data})
            toast.success("Logged in successfully")
            get().connectSocket();
        } catch (error) {
            console.log(error);
            toast.error(error.response.data)
        } finally{
            set({isLoggingIn : false})
        }
    },

    logout : async()=>{
        try {
            await toast.promise(
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        axiosInstance.post("/auth/logout")
                            .then(resolve)
                            .catch(reject);
                    }, 1000); // 1-second delay to show loading
                }),
                {
                    loading: 'Logging out..',
                    success: "Logged out successfully!",
                    error: (err) => err.response?.data?.info || "Logout failed!",
                }
            );
            set({authUser : null})
            get().disconnectSocket();

        } catch (error) {
            // toast.error(error.response.data.info)
        }
    },

    updateProfile : async(data)=>{
        set({isUpdatingProfile : true})
        try {
            // console.log("in store ::::: =>",data);
            const res = await axiosInstance.put("/api/profile",data);
            set({authUser : res.data})
            toast.success("Profile updated successfully")            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data)
        }
        set({isUpdatingProfile : false})
    },

    connectSocket : ()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            query : {
                userId : authUser._id
            }
        });
        socket.connect();
        set({socket});

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUser : userIds});
        })
    },
    
    disconnectSocket : ()=>{
        if(get().socket?.connected) get().socket.disconnect()
    }

}))