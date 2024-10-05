import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {  Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
import GetAppliedJobs from '@/hooks/GetAppliedJobs'


// const skills = ["HTML","CSS","JavaScript","React","Nextjs","Tailwindcss","Nodejs","Expressjs","MongoDB","Postgresql"]


const Profile = () => {
    
    GetAppliedJobs();
     const isResume = true;
     const [open, setOpen] = useState(false);
     
     const {user} = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 my-5 p-8 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">{user?.fullname}</h1>
              <p>{user?.Profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
              <Pen />
            </Button>
        </div>
        <div className='my-5'>
             <div className='flex items-center gap-2 my-2'>
             <Mail />
             <span>{user?.email}</span>
             </div>
             <div className='flex items-center gap-2 my-2'>
             <Contact />
             <span> {user?.phoneNumber}</span>
             </div>
        </div>
        <div className='my-5'>
             <h1 className='text-lg font-medium'>skills</h1>
             <div className='flex items-center gap-1'>
             {
                user?.Profile?.skills.length !==0 ? user?.Profile?.skills.map((item,index) => <Badge key={index}>{item}</Badge> ) : <span>No skills</span>
             }
             </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label className="text-medium font-bold">Resume</Label>
              {
                isResume ? <a target='_blank' href={user?.Profile?.resume} className='text-blue-600 hover:underline cursor-pointer'>{user?.Profile?.resumeOriginalName}</a> : <span>No Resume</span>
              }
        </div>
       
      </div>   
      <div className='max-w-4xl mx-auto bg-white   rounded-2xl'>
            <h1 className='text-xl font-medium my-5'>All Applied Jobs</h1>
            <AppliedJobTable />
        </div> 
        <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile
