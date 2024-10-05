import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import App from '@/App';
import ApplicantsTable from './ApplicantsTable';
import { APPLICANT_API_PONIT } from '@/utils/apirequest';
import { setAllApplicants } from '@/redux/applicantSlice';

const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICANT_API_PONIT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
                // console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto'> 
        <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable />
        </div>
      
    </div>
  )
}

export default Applicants
