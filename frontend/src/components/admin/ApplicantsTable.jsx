import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICANT_API_PONIT } from '@/utils/apirequest';




const shortlist = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
 
    const {applicants} =useSelector((state) => state.application);


    const statusHandler = async (status,id) =>{
          
      try {
         
         const res =await axios.post(`${APPLICANT_API_PONIT}/status/${id}/update`,{status},{
            withCredentials:true
         })
         
         if(res.data.success){
            toast.success(res.data.message);
         }

      } catch (error) {
         toast(error.response.data.message);
      }
    }


  return (
    <div>
       <Table>
         <TableCaption>List of  Applicants applied for job</TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead>Full Name</TableHead>
               <TableHead>Email</TableHead>
               <TableHead>Contact</TableHead>
               <TableHead>Resume</TableHead>
               <TableHead>Date</TableHead>
               <TableHead className="text-right">Action</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
             {
                applicants?.applications?.length >0 &&  applicants?.applications?.map((item) => (
                    <tr>
                    <TableCell>{item?.applicant?.fullname}</TableCell>
                    <TableCell>{item?.applicant?.email}</TableCell> 
                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                    <TableCell className="cursor-pointer"><a href={item?.profile?.resume}   target='_blank'  className='text-blue-400 '>{item?.applicant?.fullname}</a></TableCell>
                    <TableCell>{item?.createdAt.split("T")[0]}</TableCell>    
                    <TableCell className="text-right">
                     <Popover>
                         <PopoverTrigger>
                          <MoreHorizontal />
                         </PopoverTrigger>
                         <PopoverContent className="w-32">
                         {
                          shortlist.map((status,index) =>{
                              return (
                                 <div onClick={()=> statusHandler(status,item?._id)} key={index} className='flex items-center w-fit my-2 cursor-pointer'>
                                   <span>{status}</span>
                                 </div>
                              )
                          })
                     }
                         </PopoverContent>
                     </Popover>
                   
                    </TableCell>
                 </tr>
                ))
             }
           
         </TableBody>
       </Table>
    </div>
  )
}

export default ApplicantsTable
