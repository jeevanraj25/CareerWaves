import { RadioGroup } from '@radix-ui/react-radio-group'
import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'


const FilterData = [
    {
        filterType:"Location",
        array:["USA","Bengaluru","Mumbai","Delhi"]
    },
    {
        filterType:"Industry",
        array:["Software Development","Research Scientist","Full Stack Developer","Data Scientist"]
    },
    {
        filterType:"Salary",
        array:["10k-20k","20k-30k","30k-40k","40k-50k"]
    },
]

const FilterCard = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }


    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);


  return (
    <div className='w-full bg-white p-3 rounded-md'>
       <h1 className='text-lg font-bold'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                FilterData.map((data,index) =>(
                    <div  key={index}> 
                      <h1 className='text-lg font-bold my-2' >{data.filterType}</h1>
                      {
                          data.array.map((item,idx) =>{
                              const itemId = `id${index}-${idx}`
                              return (
                                 <div className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item}  id={itemId}/>
                                    <Label htmlFor={itemId}>{item}</Label>
                                 </div>
                              )
                          })
                      }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard
