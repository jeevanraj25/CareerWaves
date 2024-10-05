import { setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICANT_API_PONIT } from '@/utils/apirequest';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';

const GetAppliedJobs = () => {
   
    const dispatch =useDispatch();

    useEffect(() =>{

        const fetchAppliedJobs =async () =>{
            try {
                const res =await axios(`${APPLICANT_API_PONIT}/get`,{
                    withCredentials:true
                })
                
            //     console.log(res.data.application)
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                toast(error.response.data.message);
            }
        }

        fetchAppliedJobs();
    },[])
}

export default GetAppliedJobs
