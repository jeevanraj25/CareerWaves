import React from 'react'
import JobCard from './JobCard.jsx'
import { useSelector } from 'react-redux'


const randomjobs = [1,2,3,4,5,6,7,8]
function LatestJobs() {
 
   const {allJobs} = useSelector((state) => state.job);
   
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'>Latest Jobs</h1>
       <div className='grid grid-cols-1  md:grid-cols-3 gap-4 my-5'>
          {
              allJobs.length <= 0 ? <span>No jobs found</span> :  allJobs.slice(0, 6).map((job, index) => (
              <JobCard key={index}  job={job}/>
            ))
          }
       </div>
    </div>
  )
}

export default LatestJobs
