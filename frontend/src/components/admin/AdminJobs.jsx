import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { setSearchCompanyByText } from '@/redux/companySlice';
import AdminJobsTable from './AdminJobsTable';
import GetAdminAllJobs from '../../hooks/GetAdminAllJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
    
     GetAdminAllJobs();
    const navigate = useNavigate();
    const [input,setInput] = useState("");
    const dispatch =useDispatch();

    useEffect(() =>{
        
      dispatch(setSearchJobByText(input))
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
             <Button onClick={() => navigate("/admin/jobs/create")} >New Job</Button>
              </div>
              <AdminJobsTable/>
       </div>
    </div>
  )
}

export default AdminJobs
