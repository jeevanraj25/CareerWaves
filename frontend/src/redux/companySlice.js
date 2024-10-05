import Companies from "@/components/admin/Companies";
import { createSlice } from "@reduxjs/toolkit";


const company =createSlice({

    name:"company",
    initialState:{
        singleCompany:null,
        Companies :[],
        searchCompanyByText :""
    },
    reducers:{
        setSingleCompany:(state,action) =>{
            state.singleCompany = action.payload
        },
        setCompanies:(state,action) =>{
            state.Companies = action.payload
        },
        setSearchCompanyByText:(state,action) =>{
            state.searchCompanyByText = action.payload
        }
    }
});

export const {setSingleCompany,setCompanies,setSearchCompanyByText } = company.actions;

export default company.reducer;