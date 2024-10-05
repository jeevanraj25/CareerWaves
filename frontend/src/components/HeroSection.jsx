import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

function HeroSection() {

  const [searchQuerry, setSearchQuerry] = useState("");
  const dispatch = useDispatch();
  const navigate =useNavigate();

   const submitHandler = () => {
          
          dispatch(setSearchedQuery(searchQuerry)); 
          navigate("/browse");

   }
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 CareerWaves Platform</span>
        <h1 className='text-5xl font-bold '>Search &<br/>Click,  <span className='text-[#6A38C2]'> Get Hired</span> </h1>
         <p>Explore Opportunities, Apply with Confidence, Achieve Your Dream
         </p>
         <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input 
              type="text"
              onChange={(e) => setSearchQuerry(e.target.value)}
              placeholder="Search your dream job"
              className="outline-none border-none w-full " 
            />
            <Button onClick={submitHandler} className='rounded-r-full'>
                <Search  className='w-5 h-5'/>
            </Button>
         </div>
        </div>
       
    </div>
  )
}

export default HeroSection
