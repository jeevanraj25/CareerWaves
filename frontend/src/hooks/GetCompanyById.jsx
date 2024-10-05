import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { COMPANY_API_POINT } from '@/utils/apirequest';
import { setSingleCompany } from '@/redux/companySlice';
const GetCompanyById = ({id}) => {
    const dispatch=useDispatch();
     
    useEffect(()=>{
         

        const fetchJobs = async()=>{
            
             try {
                
                const res =await axios.get(`${COMPANY_API_POINT}/get/${id}`,{
                    withCredentials:true
                });
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                }
                
             } catch (error) {
                console.log(error);
             }
        }

        fetchJobs();
    },[id,dispatch])
}

export default GetCompanyById
