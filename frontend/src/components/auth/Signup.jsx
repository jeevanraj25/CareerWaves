import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_PONIT } from "@/utils/apirequest";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const FileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);

    const formdata = new FormData();
    formdata.append("fullname", input.fullname);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("password", input.password);
    formdata.append("role", input.role);
    if (input.file) {
      formdata.append("file", input.file);
    }
      
   
    // for (let pair of formdata.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_PONIT}/register`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      
      console.log(res.data);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.msg);
      }

      // console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeHandler}
              placeholder="Enter your full name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeHandler}
              placeholder="Enter your Email"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeHandler}
              placeholder="Enter your Phone Number"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeHandler}
              placeholder="Enter your Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center gap-3 my-5"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={FileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
          
              <Loader2 className="w-4 h-4 animate-spin" /> please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Sign up
            </Button>
          )}
          <div>
            <span className="text-sm text-muted-foreground">
              Already have an account?
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
