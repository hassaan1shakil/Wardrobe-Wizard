'use client'

import { useState } from 'react';
import Head from 'next/head';

const Settings = () => {
    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        profileImage: '/default-profile.png', // Sample profile image URL
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // You can implement file handling here to upload the new image
        setProfileData({ ...profileData, profileImage: URL.createObjectURL(file) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation logic and submit data
        console.log('Profile updated:', profileData);
    };

    const handleAccountDeletion = () => {
        // Add deletion logic (e.g., API call to delete the account)
        alert('Are you sure you want to delete your account? This action is irreversible.');
    };

    return (

        <>
            <Head>
                <title>Settings - YourAppName</title>
                <meta name="description" content="Manage your account settings here." />
            </Head>

            <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col justify-center items-center">

                <h1 className="text-4xl font-bold mb-8">Settings</h1>

                {/* Profile Info Section */}
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center">
                            <img
                                src={profileData.profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full mb-4"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-gray-300"
                            />
                        </div>

                        {/* First Name */}
                        <label className="flex flex-col">
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={profileData.firstName}
                                onChange={handleChange}
                                className="bg-gray-700 p-2 rounded mt-1"
                            />
                        </label>

                        {/* Last Name */}
                        <label className="flex flex-col">
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={profileData.lastName}
                                onChange={handleChange}
                                className="bg-gray-700 p-2 rounded mt-1"
                            />
                        </label>

                        {/* Email */}
                        <label className="flex flex-col">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleChange}
                                className="bg-gray-700 p-2 rounded mt-1"
                            />
                        </label>

                        {/* Password Fields */}
                        <label className="flex flex-col">
                            Old Password:
                            <input
                                type="password"
                                name="oldPassword"
                                value={profileData.oldPassword}
                                onChange={handleChange}
                                className="bg-gray-700 p-2 rounded mt-1"
                                placeholder="Enter old password"
                            />
                        </label>

                        <label className="flex flex-col">
                            New Password:
                            <input
                                type="password"
                                name="newPassword"
                                value={profileData.newPassword}
                                onChange={handleChange}
                                className="bg-gray-700 p-2 rounded mt-1"
                                placeholder="Enter new password"
                            />
                        </label>

                        <label className="flex flex-col">
                            Confirm New Password:
                            <input
                                type="password"
                                name="confirmPassword"
                                value={profileData.confirmPassword}
                                onChange={handleChange}
                                className="bg-gray-700 p-2 rounded mt-1"
                                placeholder="Confirm new password"
                            />
                        </label>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Delete Account Section */}
                <div className="bg-red-800 p-8 rounded-lg shadow-lg w-full max-w-xl">
                    <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
                    <p className="mb-4">
                        Warning: Deleting your account is a permanent action. All of your data will be lost and cannot be recovered.
                    </p>
                    <button
                        onClick={handleAccountDeletion}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded text-white"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </>


    );
};

export default Settings;
