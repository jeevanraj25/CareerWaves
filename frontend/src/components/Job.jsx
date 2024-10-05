import React from 'react'
import { Button } from './ui/button'
import {  Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Job = ({job}) => {

  // console.log(job?._id);
 
    const navgate = useNavigate()
    const JobId = "1";
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex justify-between items-center'>
        <p className='text-sm text-muted-foreground'> 2 days ago</p>
      <Button variant="outline" className="rounded-full" size="icon">
        <Bookmark />
      </Button>
        </div>
    

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
          <AvatarImage src={job?.company?.logo ? job?.company?.logo : "" } />
          </Avatar>
        </Button>
        <div>
          <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='text-lg font-bold my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
         <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Openings</Badge>
         <Badge className={'text-[#F83002] font-bold'} variant="ghost" >{job?.jobType}</Badge>
         <Badge className={'text-[#7209b7] font-bold'} variant="ghost" >{job?.salary} LPA</Badge>
       </div>
       <div className='flex items-center gap-4 mt-4'>
         <Button variant="outline" onClick={()=>navgate(`/description/${job?._id}`)}>Details</Button>
         <Button variant="secondary">Save for later</Button>
       </div>
    </div>
  );
}

export default Job
