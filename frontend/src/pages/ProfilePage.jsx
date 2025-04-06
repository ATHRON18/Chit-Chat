import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react'

const ProfilePage = () => {

  const { authUser, isUpdatingProfile,updateProfile } = useAuthStore();
  const [selectedImg,setSelectedImg]=useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async()=>{
      const base64Img = reader.result;

      setSelectedImg(base64Img);
      await updateProfile({profileImg : base64Img});
    }
   }

  return (
    <div  className='  container h-[91%] min-w-full flex flex-col gap-3 justify-center items-center bg-base-100 text-secondary-content-content/70'>
      {/* top */}
      <div className='top hover:border-primary/50 border border-transparent  shadow-md   flex flex-col justify-center bg-base-200 h-3/5 w-[90%] sm:w-[60%] lg:w-[30%] rounded-md'>
        <div className='h-[60%] flex flex-col'>
          <div className='h-[30%] flex flex-col justify-center items-center '>
            <div className='text-2xl '>Profile</div>
            <div className='text-xs'>Your profile information</div>
          </div>
          <div className='h-[70%] flex flex-col justify-between items-center'>
            {/*hrere is pasteing  */}

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={authUser?.profileImg ||selectedImg ||"/avatar.png"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 border-base-content "
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm ">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>
          </div>
        </div>
        <div className='h-[40%] w-full text-pretty'>
          <div className='w-full flex flex-col px-2'>
            <label className="fieldset-label ">Full Name</label>
            <input type="text" readOnly value={authUser ? authUser.fullName : ""} className="input text-base-content/70 w-full border cursor-pointer border-zinc-600 focus:outline-none bg-transparent " />
          </div>
          <div className='w-full  flex flex-col px-2'>
            <label className='fieldset-label '>Email</label>
            <input type="email" readOnly value={authUser.email?authUser.email : ""} className="input w-full cursor-pointer text-base-content/70  border-zinc-600 focus:outline-none bg-transparent " />
          </div>
        </div>
      </div>

      {/* down */}
      <div className='down hover:border-primary/50 flex flex-col border border-transparent  justify-between bg-base-200 h-1/4 w-[90%] sm:w-[60%] lg:w-[30%] rounded-md p-5'>
        <h2 className='text-lg font-medium mb-4'>Account information</h2>
        <div className='text-[12px] space-y-3'>
          <div className='border-b py-2 border-zinc-600 flex justify-between'>
            <span> Member since</span>
            <span>{authUser?.createdAt?.split("T")[0]}</span>
          </div>
          <div className='flex justify-between'>
            <span>Account status</span>
            <span className='text-green-500 font-semibold'>Active</span>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage