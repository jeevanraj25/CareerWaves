import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_POINT } from '@/utils/apirequest';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const GetAllCompany = () => {
    const dispatch=useDispatch();
     
    useEffect(()=>{
         

        const fetchJobs = async()=>{
            
             try {
                
                const res =await axios.get(`${COMPANY_API_POINT}/get`,{
                    withCredentials:true
                });
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies))
                }
                // console.log(res.data)
                
             } catch (error) {
                console.log(error);
             }
        }

        fetchJobs();
    },[])
}

export default GetAllCompany
