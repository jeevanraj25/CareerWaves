import React, { useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
  

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Mobile Developer",
    "Data Scientist",
    "Data Analyst",
     "Devops Engineer"
]

function CategoryCarousel() {
     
  const [searchQuerry, setSearchQuerry] = useState("");
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const submitHandler = () => {
          
    dispatch(setSearchedQuery(searchQuerry)); 
    navigate("/browse");

}
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
            {
                category.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                       <Button onClick={submitHandler} variant="outline" className="rounded-full">{item}</Button> 
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
