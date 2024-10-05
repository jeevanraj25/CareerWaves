import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import GetAllCompany from '@/hooks/GetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    
   GetAllCompany();
    const navigate = useNavigate();
    const [input,setInput] = useState("");
    const dispatch =useDispatch();

    useEffect(() =>{
      dispatch(setSearchCompanyByText(input))
    },[input])
  return (
    <div>
       <Navbar />
       <div className='max-w-6xl mx-auto my-10'>
              <div className='flex items-center justify-between my-5'>
              <Input 
                className="w-fit"
                placeholder="Search By name"
                onChange={(e) => setInput(e.target.value)}
             />
             <Button onClick={() => navigate("/admin/companies/create")} >New Company</Button>
              </div>
              <CompaniesTable  />
       </div>
    </div>
  )
}

export default Companies
