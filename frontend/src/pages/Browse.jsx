import Job from '@/components/Job'
import Navbar from '@/components/shared/Navbar'
import GetAllJobs from '@/hooks/GetAllJobs'
import { setSearchedQuery } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// const randomjobs = [1,2,3,4,5,6,7,8]

const Browse = () => {


   GetAllJobs();

  const {allJobs} = useSelector((state) => state.job);
 const dispatch =useDispatch();
 useEffect(() => {
  dispatch(setSearchedQuery("")); 
}, []);


  return (
    <div>
      <Navbar />
       <div className='max-w-7xl mx-auto my-10'>
         <h1 className='text-xl font-bold my-10'>Search Results ({allJobs.length}) </h1>
         <div className='grid grid-cols-3 gap-4'>
         {
             
             allJobs.map((item,index) => {
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
