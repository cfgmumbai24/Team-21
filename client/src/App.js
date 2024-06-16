import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Mentor from './components/Mentor'
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'
import Hehe from './components/Hehe';
import SidebarComponent from './components/Siderbar/Sidebar';
import Calendar from './components/Siderbar/Calender';
import ScholarShip from './components/ScholarShip';
import Learning from './components/Siderbar/Learnings';
import Assessments from './components/Siderbar/Assessments';
import StudentProfile from './components/Siderbar/StudentProfile';
import MentorProfile from './components/MentorProfile';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import AdminDashboard from './components/AdminDashboard';
import Role from './components/Role';
import Feedback from './charts/mentor/Feedback';
import FeedbackForm from './components/Siderbar/FeedbackForm';
import MentorCalendar from './components/MentorCalender';


/** root routes */
const router = createBrowserRouter([
    {
    },
    {
        path:'/mentor',
        element:<Mentor></Mentor>
    },
    {
        path : '/',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path:'/calender',
        element:<Calendar></Calendar>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path:'/scholarship',
        element:<ScholarShip></ScholarShip>
    },
    { path: '/hehe',
      element: <AuthorizeUser><Hehe/></AuthorizeUser>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
    {
        path: "/sidebar",
        element: <SidebarComponent></SidebarComponent>
    },{
        path:"/learning",
        element:<Learning></Learning>
    },{
        path:"/assessment",
        element:<Assessments></Assessments>
    },{
        path:"/studentProfile",
        element:<StudentProfile></StudentProfile>
    },{
        path:"/mentorProfile",
        element:<MentorProfile></MentorProfile>
    },{
        path:"/studentDashboard",
        element:<StudentDashboard></StudentDashboard>
    },
    {
        path:"/mentorDashboard",
        element:<MentorDashboard></MentorDashboard>
    },
    {
        path:"/adminDashboard",
        element:<AdminDashboard></AdminDashboard>
    },{
        path:"/role",
        element:<Role></Role>
    },{
        path:"/feedback",
        element:<FeedbackForm></FeedbackForm>
    },{
        path:"mentorCalender",
        element:<MentorCalendar></MentorCalendar>
    },{
        path:"/username",
        element:<Username></Username>
    }
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

