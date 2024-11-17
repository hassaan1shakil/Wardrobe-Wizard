// 'use client'

import { useState } from 'react';
import api from '@/utils/api';
import { getCookie } from '@/utils/cookieManager';

// export async function getUserInfo() {
//     try {
//         console.log('Making request to get user info...');

//         const response = await fetch("http://127.0.0.1:8000/api/get-user-info/", { 
//             method: 'GET',
//             credentials: 'include', // Ensure this is included
//             headers: {
//                 'Authorization': `Bearer ${getCookie("access_token")}`
//               }
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();

//     } catch (error) {
//         console.error("Error fetching user info", error);
//         return null; // Return null to indicate failure
//     }
// }


// export async function testing() {
//     const data = await getUserInfo()
//     return data;
// }

export default function UpdateProfileForm({ userInfo, error }) {

    // const data = testing()
    // console.log(data)

    const [responseMessage, setResponseMessage] = useState("")

    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profileImage: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileData({ ...profileData, profileImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (profileData.firstName == '' && profileData.lastName == '' && profileData.email == '')
            setResponseMessage("Please Provide The Credentials");

        else {

            const formData = new FormData();

            if (profileData.firstName != '')
                formData.append("first_name", profileData.firstName)

            if (profileData.lastName != '')
                formData.append("last_name", profileData.lastName)

            if (profileData.email != '')
                formData.append("email", profileData.email)

            if (profileData.profileImage != '')
                formData.append("profile_image", profileData.profileImage)

            try {
                const response = await api.put('/update-info/', formData);

                if (response.status === 200) {
                    setResponseMessage(response.data.message)
                }

                else {
                    setResponseMessage(response.data.message || "Profile Info Could Not Be Updated. Please Try Again.")
                }

            } catch (error) {
                setResponseMessage(error.response.data.email[0] || "An error occurred. Please try again.");
            
            } finally {

                // Reset to initial state
                setProfileData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    profileImage: '',
                });
            }
        }
    };

    return (

        <>
            {/* Profile Info Section */}
            <div className="bg-PurpleBG p-8 rounded-lg shadow-lg w-full max-w-xl mb-12 ">
                <h2 className="text-2xl font-semibold mb-6 text-center">Profile Information</h2>

                <form
                    className="flex flex-col gap-4"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >

                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                        <img
                            src='/images/wizard7.png' ////////////////////////
                            alt="Profile Photo"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <label className="cursor-pointer bg-darkOrange hover:bg-lightOrange text-white font-bold py-2 px-4 rounded">
                            Change Profile Photo
                            <input
                                type="file"
                                id="profile_image"
                                name="profile_image"
                                accept="image/png, image/jpeg"
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
                            placeholder='John'  /////////////////////
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
                            placeholder='Doe'   //////////////////
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
                            placeholder='john.doe@example.com'  /////////////////////
                            value={profileData.email}
                            onChange={handleChange}
                            className="text-gray-500 p-2 rounded mt-1"
                        />
                    </label>

                    {/* Display response message */}
                    {responseMessage && <p className="text-red-500">{responseMessage}</p>}

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