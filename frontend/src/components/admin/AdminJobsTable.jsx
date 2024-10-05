import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, SearchJobByText } = useSelector((state) => state.job);
  const [filterjobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredjob =
      allAdminJobs.length >= 1 &&
      allAdminJobs.filter((job) => {
        if (!SearchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(SearchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(SearchJobByText.toLowerCase())
        );
      });

    setFilterJobs(filteredjob || []);
  }, [allAdminJobs, SearchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>List of recent company jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterjobs.length === 0 ? (
            <span>No Jobs Available</span>
          ) : (
            filterjobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${job.company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
