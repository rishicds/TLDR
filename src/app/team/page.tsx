"use client"
import BasicFAQ from '@/components/Team/FAQ';
import Team from '@/components/Team/Team';
import NavBar from '@/components/common/Navbar';
import React from 'react';

const TeamPage: React.FC = () => {
    return(<><div className='bg-black'><NavBar/><Team/><BasicFAQ/></div></>)
};

export default TeamPage;