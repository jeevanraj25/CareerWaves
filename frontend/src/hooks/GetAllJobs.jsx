import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_PONIT } from '@/utils/apirequest'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GetAllJobs = () => {

    const dispatch=useDispatch();
    const {searchedQuery} =useSelector(state=>state.job)
     
    useEffect(()=>{
         
        const fetchJobs = async()=>{
            
             try {
                
                const res =await axios.get(`${JOB_API_PONIT}/get`,{
                    withCredentials:true
                });
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
                
             } catch (error) {
                console.log(error);
             }
        }

        fetchJobs();
    },[])
}

export default GetAllJobs
