import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_PONIT } from '@/utils/apirequest';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const GetAdminAllJobs = () => {
    const dispatch=useDispatch();
     
    useEffect(()=>{
         
        const fetchJobs = async()=>{
            
             try {
                
                const res =await axios.get('http://localhost:3000/api/job/getadmin',{
                    withCredentials:true
                });
                // console.log(res.data)
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
                
             } catch (error) {
                console.log(error);
                console.log(error.response.data.message);
             }
        }

        fetchJobs();
    },[])
}

export default GetAdminAllJobs
