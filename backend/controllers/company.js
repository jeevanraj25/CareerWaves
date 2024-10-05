import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import Cloudinary from "../utils/cloudinary.js";

export const registerCompany =async (req,res) =>{

    try {
        
        const {CompanyName} = req.body;
         
        //  console.log(CompanyName)
     
        if(!CompanyName){
            return res.status(401).json({
                msg:"company is not register",
                success:false
            })
        }

        let company =await Company.findOne({CompanyName});
        if(company){
            return res.status(401).json({
                msg:"company already exists",
                success:false
            })
        }

        company = await Company.create({
            name:CompanyName,
            userId:req.id
        })

        return res.status(200).json({
            msg:"company registered successfully",
            company,
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:error.message,
            success:false
        })
    }
}

export const GetCompany =async (req,res) =>{

    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        
        if(!companies){
            return res.status(404).json({
                msg:"Companies not found",
                success:false
            })
        }

        return res.status(200).json({
            companies,
            success:true
        })

        // const userId = req.id; // logged in user id
        // const companies = await Company.find({ userId });
        // if (!companies) {
        //     return res.status(404).json({
        //         message: "Companies not found.",
        //         success: false
        //     })
        // }
        // return res.status(200).json({
        //     companies,
        //     success:true
        // })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:error.message,
            success:false
        })
    }
}

export const getCompanyById = async (req,res) =>{

    try {
        const companyId = req.params.id;
        
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(401).json({
                msg:"Company not found",
                success:false
            })
        }
        
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:error.message,
            success:false
        })
    }
}


export const updateCompany = async (req,res) =>{
     
    try {
        
        const {name ,description,website,location} = req.body;
        // console.log(name ,description,website,location)

        const file =req.file;
        const fileuri = getDataUri(file);
        const cloudResponse =await Cloudinary.uploader.upload(fileuri.content);
        const logo =cloudResponse.secure_url;

        const updatedata ={name ,description,website,location,logo};

        const company = await Company.findByIdAndUpdate(req.params.id,updatedata,{new:true});

        if(!company){
            return res.status(401).json({
                msg:"Company information is invlaid",
                success:false
            })
        }

        return res.status(200).json({
            msg:"Company information updated",
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg:error.message,
            success:false
        })
    }
}