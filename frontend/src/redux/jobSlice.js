import { createSlice } from "@reduxjs/toolkit";



const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        SingleJob :null,
        SearchJobByText :"",
        allAppliedJobs:[],
        searchedQuery:"",
        
    },
    reducers:{

        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob :(state,action) =>{
            state.SingleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJobByText: (state, action) => {
            state.SearchJobByText = action.payload
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});

export const {setAllJobs , setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer