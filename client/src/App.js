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
import NavBar from './components/Siderbar/NavBar';
import Assessments from './components/Siderbar/Assessments';

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Profile></Profile>
    },
    {
        path:'/mentor',
        element:<Mentor></Mentor>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
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
    }
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

