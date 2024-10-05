import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Button } from '../ui/button'
import { COMPANY_API_POINT } from '@/utils/apirequest'

import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'

const CreateCompanies = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
     
    // console.log(companyName)
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_POINT}/register`,{ CompanyName: companyName }, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
             console.log(res.data)
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.msg);
                const companyId = res?.data?.company?._id;
                 
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            // console.log(error.response.data.message);
        }
    }
  return (
    <div>
         <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500 my-2'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
      
    </div>
  )
}

export default CreateCompanies
