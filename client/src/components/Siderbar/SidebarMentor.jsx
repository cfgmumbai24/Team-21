import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Face2Icon from '@mui/icons-material/Face2';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import QuizIcon from '@mui/icons-material/Quiz';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WebhookIcon from '@mui/icons-material/Webhook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import './Sidebar.css';



const imageHeight = 35;
const imageWidth = 35;


const SidebarMentor = () => {
    const [collapsed, setCollapsed] = useState(true);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    const sendWhatsAppMessage = () => {
        const whatsappURL = "https://wa.me/9152730248";
        window.location.href = whatsappURL;
      };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''} relative`}>
            <Sidebar collapsed={collapsed}>
                <Menu>
                    <MenuItem onClick={handleToggleSidebar}  component={<Link to="/mentorDashboard" />}  className='mt-12'>
                        {
                            collapsed ? <DoubleArrowIcon />
                                : (
                                    <div className='flex justify-start items-center'>
                                        <DoubleArrowIcon />
                                        <span className='ml-2'>Eklavya</span>
                                    </div>
                                )
                        }
                    </MenuItem>
                    <MenuItem component={<Link to="/mentorProfile" />} className='mt-4'>
                        {
                            collapsed ? <Face2Icon />
                                : (
                                    <div className='flex justify-start items-center'>
                                        <Face2Icon />
                                        <div className='ml-2'>Profile</div>
                                    </div>
                                )
                        }
                    </MenuItem>
                    <Link to={'/feedback'}>
                    <MenuItem className='mt-4'>
                        {
                            collapsed ? <LocalLibraryIcon />
                                : (
                                    <div className='flex justify-start items-center'>
                                        <LocalLibraryIcon />
                                        <div className='ml-2'>Feedback</div>
                                    </div>
                                )
                        }
                    </MenuItem>
                    </Link>
                    <MenuItem component={<Link to="/mentorCalender" />} className='mt-4'>
                        {
                            collapsed ? <QuizIcon />
                                : (
                                    <div className='flex justify-start items-center'>
                                    <QuizIcon />
                                        <div className='ml-2'>Calender</div>
                                    </div>
                                )
                        }
                    </MenuItem>
                    <MenuItem  className='mt-4'>
                        {
                            collapsed ? <div onClick={sendWhatsAppMessage}><WhatsAppIcon /></div>
                                : (
                                    <div className='flex justify-start items-center' onClick={sendWhatsAppMessage}>
                                    <WhatsAppIcon />
                                        <div className='ml-2'>Connect with Mentor</div>
                                    </div>
                                )
                        }
                    </MenuItem>
                </Menu>
            </Sidebar>

        </div>

    )
}

export default SidebarMentor