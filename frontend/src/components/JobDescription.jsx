import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";

import axios from "axios";
import { APPLICANT_API_PONIT, JOB_API_PONIT } from "@/utils/apirequest";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  //  console.log(id)

  const params = useParams();
  const JobId = params.id;
  const { SingleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const date = new Date(SingleJob?.createdAt);
  const formattedDate = date.toLocaleDateString();

  const isIntiallyApplied = SingleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);


  
  //  console.log("Is Applied:", isApplied); // Will log true or false based on whether the user has applied
  //  console.log("User ID:", user?.userId);

  const applyJob = async () => {
        // console.log(JobId)
         try {
            const res =await axios.get(`${APPLICANT_API_PONIT}/apply/${JobId}`,{
                withCredentials:true
            });
            if(res.data.success){
                 toast.success(res.data.message);
                 setIsApplied(true);
                 const updateSingleJob = {...SingleJob,applications: [...SingleJob.applications,{ applicant: user?._id }]};
                 dispatch(setSingleJob(updateSingleJob));
            }
            // console.log(res.data)
         } catch (error) {
           console.log(error);
           toast.error(error.response.data.message);
         }
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_PONIT}/get/${JobId}`, {
          withCredentials: true,
        });
        // console.log(res.data)
        if (res.data.success) {
          setIsApplied(res.data.job.applications.some((app) => app.applicant === user?._id));
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, [JobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">{SingleJob?.title}</h1>
        <div className="flex items-center gap-2 mt-4">
          <Badge className={"text-blue-700 font-bold"} variant="ghost">
            {SingleJob?.position} Openings
          </Badge>
          <Badge className={"text-[#F83002] font-bold"} variant="ghost">
            {SingleJob?.jobType}{" "}
          </Badge>
          <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
            {SingleJob?.salary} LPA
          </Badge>
        </div>
        <Button
          disabled={isApplied}
          onClick= {isApplied ? null : applyJob}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#6A38C2] hover:bg-[#5929ac] cursor-pointer "
          } `}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        job Description
      </h1>
      <div className="mt-4">
        <h1 className="font-bold my-1">
          Role :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {SingleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {SingleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {SingleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Job Type :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {SingleJob?.jobType}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {SingleJob?.experienceLevel}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {SingleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {SingleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Date Posted :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {formattedDate}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
