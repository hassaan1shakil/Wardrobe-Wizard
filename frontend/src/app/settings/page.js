'use client'

import { useState } from 'react';
import Header from '@/components/header';
import UpdateProfileForm from '@/components/update-profile-form';
import UpdatePasswordForm from '@/components/update-password-form';
import DeleteProfile from '@/components/delete-profile';

export default function SettingsPage(){

    return (

        <>
            <Header />

            <div className="min-h-screen overflow-hidden bg-darkPurple text-white flex flex-col justify-center items-center p-7">

                <UpdateProfileForm />

                <UpdatePasswordForm />

                <DeleteProfile />
                
            </div>
        </>


    );
};
