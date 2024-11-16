'use client'

import { useState } from 'react';
import Router from 'next/router';
import api from '@/utils/api'
import { removeCookie } from '@/utils/cookieManager';

export default function UpdatePasswordForm() {

    const [errorMessage, setErrorMessage] = useState("");

    const [profileData, setProfileData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (profileData.newPassword != profileData.confirmPassword) {
            setErrorMessage("New Password & Confirm Password Do Not Match!");
        }

        else {

            try {
                const payload = {
                    old_password: profileData.oldPassword,
                    new_password: profileData.newPassword
                };

                const response = await api.put('/update-password/', payload);

                if (response.status === 200) {

                    removeCookie("access_token")
                    removeCookie("refresh_token")
                    setErrorMessage("")

                    alert("Password Updated Successfully")
                    // Router.push('/login')
                    window.location.href = '/login'; // Redirects the user to the login page

                } else {
                    setErrorMessage(response.data.message || response.data);
                }
            } catch (error) {
                // Handle error (e.g., network failure)
                setErrorMessage("An error occurred. Please try again.");
                console.error('Full error details:', error);
            }

        }
    };

    return (

        <>
            {/* Profile Info Section */}
            <div className="bg-PurpleBG p-8 rounded-lg shadow-lg w-full max-w-xl mb-12 ">
                <h2 className="text-2xl font-semibold mb-6 text-center">Update Password</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Password Fields */}
                    <label htmlFor="oldPassword" className="flex flex-col">
                        Old Password:
                        <input
                            type="password"
                            name="oldPassword"
                            value={profileData.oldPassword}
                            onChange={handleChange}
                            className="text-gray-500 p-2 rounded mt-1"
                            placeholder="Enter old password"
                        />
                    </label>

                    <label htmlFor="newPassword" className="flex flex-col">
                        New Password:
                        <input
                            type="password"
                            name="newPassword"
                            value={profileData.newPassword}
                            onChange={handleChange}
                            className="text-gray-500 p-2 rounded mt-1"
                            placeholder="Enter new password"
                        />
                    </label>

                    <label htmlFor="confirmPassword" className="flex flex-col">
                        Confirm New Password:
                        <input
                            type="password"
                            name="confirmPassword"
                            value={profileData.confirmPassword}
                            onChange={handleChange}
                            className="text-gray-500 p-2 rounded mt-1"
                            placeholder="Confirm new password"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-darkOrange hover:bg-lightOrange p-2 rounded text-white"
                    >
                        Update Password
                    </button>
                </form>

                {/* Display error message if it exists */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </>
    );
};