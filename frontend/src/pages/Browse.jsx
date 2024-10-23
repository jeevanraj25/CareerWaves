import Job from '@/components/Job'
import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import GetAllJobs from '@/hooks/GetAllJobs'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'




const Browse = () => {

  GetAllJobs();
  const [searchQuerry, setSearchQuerry] = useState("");
  
        
  const {allJobs} = useSelector((state) => state.job);
 

  const jobs = allJobs.filter((job) => job.title.toLowerCase ()===searchQuerry.toLowerCase() || job.company.name.toLowerCase()=== searchQuerry.toLowerCase())
 
  const submitHandler = (e) =>{
   
      setSearchQuerry(e.target.value);
      
  }

  return (
    <div>
      <Navbar />
       <div className='max-w-7xl mx-auto my-10'>
       <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input 
              type="text"
              onChange={submitHandler}
              placeholder="Search your dream job"
              className="outline-none border-none w-full " 
            />
            <Button  onChange={submitHandler} className='rounded-r-full'>
                <Search  className='w-5 h-5'/>
            </Button>
         </div>
         <h1 className='text-xl font-bold my-10'>Search Results ({jobs.length}) </h1>
         <div className='grid grid-cols-3 gap-4'>
         {
             
            jobs && jobs.map((item,index) => {
              return (
                  <Job key={index}  job={item}/>
                )
              
             }
               
             )
           }
         </div>
       </div>
    </div>
  )
}

export default Browse
