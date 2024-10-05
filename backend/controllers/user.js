import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import getDataUri from "../utils/datauri.js";
import Cloudinary from  "../utils/Cloudinary.js"

export const register = async (req,res) => {
         
    try {
        
        const {fullname, email, phoneNumber, password, role} = req.body;

        //  console.log(fullname, email, phoneNumber, password, role);

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(401).json({
                msg:"all fields are required",
                success:false
            })
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await Cloudinary.uploader.upload(fileUri.content);

        // // console.log(cloudResponse);

        const user = await User.findOne({email});

        if(user){
            return res.status(401).json({
                msg:"user already exists",
                success:false
            })
        }


         const hasdPassword = await bcrypt.hash(password, 10);

         await User.create({
            fullname,
            email,
            phoneNumber,
            password:hasdPassword,
            role,
            profile:{
              profilePhoto:cloudResponse.secure_url,
          }
         })

         return res.status(200).json({
            msg:"user created successfully",
            success:true
        })

    } catch (error) {
        
        return res.status(401).json({
            msg:error.message,
            success:false
        })
    }
}


export const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Validate input
      if (!email || !password || !role) {
        return res.status(401).json({
          msg: "All fields are required",
          success: false,
        });
      }
  
      // Check if the user exists
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          msg: "User not exists",
          success: false,
        });
      }
  
      // Validate password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          msg: "Incorrect password",
          success: false,
        });
      }
  
      // Validate role
      if (role !== user.role) {
        return res.status(401).json({
          msg: "Incorrect role",
          success: false,
        });
      }
  
      // Generate token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
      });
  
      // Return user data without password
      const userData = {
        userId: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      };
  
      // Set token in cookie and return response
      return res
        .status(200)
        .cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          httpOnly: true,
          sameSite: "strict", 
          secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
        })
        .json({
          msg: "Login successful",
          user: userData,
          success: true,
        });
  
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        success: false,
      });
    }
  };


export const logout = async (req,res) =>{
     
    try {
        return res.status(200).cookie("token",null,{maxAge:0,httponly:true,samesite:"strict" }).json({
            msg:"logout successful",
            success:true
        })
    } catch (error) {
        return res.status(401).json({
            msg:error.message,
            success:false
        })
    }
}


export const updateProfile = async (req,res) =>{

    try {
         const {fullname,email,phoneNumber,bio,skills} = req.body;
        //  console.log(fullname,email,phoneNumber,bio,skills);

         const file =req.file;
         const fileUri = getDataUri(file);
         const cloudResponse = await Cloudinary.uploader.upload(fileUri.content,{
          resource_type: "auto",
      });
      console.log(cloudResponse);
        //  if(!fullname || !email || !phoneNumber || !bio || !skills){
        //      return res.status(401).json({
        //          msg:"all fields are required",
        //          success:false
        //      })
        //  }

        let skillArray;

        if(skills){
            skillArray = skills.split(",");
        } 
         const userId = req.id;
        //    console.log(userId);

           let user = await User.findById(req.id);


         if(!user){
             return res.status(401).json({
                 msg:"user not found",
                 success:false
             })

         }
         if(fullname) user.fullname = fullname
         if(email) user.email = email
         if(phoneNumber)  user.phoneNumber = phoneNumber
         if(bio) user.profile.bio = bio
         if(skills) user.profile.skills = skillArray


         if(cloudResponse){
             user.profile.resume = cloudResponse.secure_url;
             user.profile.resumeOriginalName = file.originalname;
         }

         await user.save();

         user ={
            userId:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            Profile :user.profile

         }

        return res.status(200).json({
            msg:"profile updated successfully",
            user,
            success:true
        });

    } catch (error) {
        
        return res.status(400).json({
            msg:error.message,
            success:false
        })
    }
}