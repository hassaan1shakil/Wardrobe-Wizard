'use client'

import { useState } from 'react';
import Header from '@/components/header';
import ProfileInfo from '@/components/profile-info';
import DeleteProfile from '@/components/delete-profile';

export default function SettingsPage(){

    return (

        <>
            <Header />

            <div className="min-h-screen overflow-hidden bg-darkPurple text-white flex flex-col justify-center items-center p-7">

                <ProfileInfo />

                <DeleteProfile />
                
            </div>
        </>


    );
};
