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

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
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
    }
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

