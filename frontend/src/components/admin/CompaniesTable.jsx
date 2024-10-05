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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { Companies = [], searchCompanyByText } = useSelector((state) => state.company);
  const [filterCompany, setFilterCompany] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Filter companies only if Companies is an array
    if (Array.isArray(Companies)) {
      const filteredCompany = Companies.filter((company) => {
        if (!searchCompanyByText) {
          return true; // If there's no search text, include all companies
        }
        return company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });

      setFilterCompany(filteredCompany);
    } else {
      setFilterCompany([]); // Reset to empty if Companies is not an array
    }
  }, [Companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>List of Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No Companies</TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                        <Edit2 className='w-4' />
                        <span>Edit</span>
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

export default CompaniesTable;
