import React, { useEffect } from 'react'
import Navbar from '../components/shared/Navbar.jsx'
import HeroSection from '@/components/HeroSection.jsx'
// import CategoryCarousel from '@/components/CategoryCarousel.jsx'
import LatestJobs from '@/components/LatestJobs.jsx'
import Footer from '@/components/shared/Footer.jsx'
import GetAllJobs from '@/hooks/GetAllJobs.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RecruiterCompanies from '@/components/RecruiterCompanies.jsx'



function Home() {
   
   GetAllJobs();
    const {user} = useSelector((state) => state.auth);
     const navigate = useNavigate();
     
     useEffect(()=>{
        if(user?.role  === "recruiter"){
            navigate("/admin/companies")
        }  
       
     },[])

  return (
    <div>
      <Navbar />
      <HeroSection />
     
       <RecruiterCompanies />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home
