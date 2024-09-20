'use client'

import { useState } from 'react';

export default function ProfileInfo() {

    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        profileImage: '/images/wizard7.png', // Sample profile image URL
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

    return (

        <>
            {/* Profile Info Section */}
            <div className="bg-PurpleBG p-8 rounded-lg shadow-lg w-full max-w-xl mb-12 ">
                <h2 className="text-2xl font-semibold mb-6 text-center">Profile Information</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                        <img
                            src={profileData.profileImage}
                            alt="Profile Photo"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <label className="cursor-pointer bg-darkOrange hover:bg-lightOrange text-white font-bold py-2 px-4 rounded">
                            Change Profile Photo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                    </div>

                    {/* First Name */}
                    <label htmlFor="firstName" className="flex flex-col">
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleChange}
                            className="text-gray-500 p-2 rounded mt-1"
                        />
                    </label>

                    {/* Last Name */}
                    <label htmlFor="lastName" className="flex flex-col">
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleChange}
                            className="text-gray-500 p-2 rounded mt-1"
                        />
                    </label>

                    {/* Email */}
                    <label htmlFor="email" className="flex flex-col">
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className="text-gray-500 p-2 rounded mt-1"
                        />
                    </label>

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
                        Update Profile
                    </button>
                </form>
            </div>
        </>
    );
};