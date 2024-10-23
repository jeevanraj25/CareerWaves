import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

function HeroSection() {

  



  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 CareerWaves Platform</span>
        <h1 className='text-5xl font-bold '>Discover &   <span>Apply,</span> <br/> <span className='text-[#6A38C2]'> Unlock Your Career</span> </h1>
         <p>Explore Opportunities, Apply with Confidence, Achieve Your Dream
         </p>
        </div>
       
    </div>
  )
}

export default HeroSection
