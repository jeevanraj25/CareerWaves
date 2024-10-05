
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import './App.css'
import Navbar from './components/shared/Navbar.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Home from "../src/pages/Home.jsx"
import Jobs from './pages/Jobs';
import Browse from './pages/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CreateCompanies from './components/admin/CreateCompanies';
import Companysetup from './components/admin/Companysetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJobs from './components/admin/PostJobs';
import Applicants from './components/admin/Applicants';
import ProtectedRouteUser from './components/ProtectedRouteUser';



const appRouter = createBrowserRouter([
   {
    path: "/",
    element:<Home />
   },
   {
    path: "/login",
    element:<Login />
   },
   {
    path: "/signup",
    element:<Signup />
   },
   {
     path:"/jobs",
     element:<ProtectedRouteUser><Jobs /></ProtectedRouteUser>
   },
   {
    path: "/browse",
    element:<ProtectedRouteUser><Browse /></ProtectedRouteUser>
   },
   {
    path: "/profile",
    element:<ProtectedRouteUser><Profile /></ProtectedRouteUser> 
   },
   {
    path:"/description/:id",
    element:<ProtectedRouteUser><JobDescription /></ProtectedRouteUser> 
   },
   {
      path:"/admin/companies",
      element:<Companies />
   },
   {
       path:"/admin/companies/create",
       element:<CreateCompanies />
   },
   {
      path:"/admin/companies/:id",
      element:<Companysetup />
   },
   {
      path:"/admin/jobs",
      element:<AdminJobs />

   },{
      path:"/admin/jobs/create",
      element:<PostJobs />
   },
   {
      path:"/admin/jobs/:id/applicants",
      element:<Applicants />
   }
   
])


function App() {
  
  return (
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}

export default App
