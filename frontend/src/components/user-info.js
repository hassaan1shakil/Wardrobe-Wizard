'use client'

import { useState, useEffect } from "react"
import api from "@/utils/api";

export default function UserInfo() {

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        profileImage: null,
    });

    useEffect(() => {

        const GetUserInfo = async () => {

            try {
                const response = await api.get('/get-user-info/');

                if (response.status === 200) {

                    const data = response.data

                    setProfileData({
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        username: data.username,
                        profileImage: data.profile_image,
                    });
                }

                else {
                    throw new Error("Could Not Get Profile Information")
                }

            } catch (error) {
                setErrorMessage(error.message)

            } finally {
                setLoading(false);
            }
        };

        GetUserInfo();

    }, [])

    if (loading)
        return (
            <div className="bg-darkPurple min-h-screen">

                Loading User Info...

            </div>
        )

    if (errorMessage)
        return (
            <div className="bg-darkPurple min-h-screen">

                Error: {errorMessage}

            </div>
        )

    return (

        <div className="flex flex-col my-14 gap-12">

            {/* <h1 className="flex text-4xl justify-center">Profile Information</h1> */}

            <div className="flex justify-center items-center gap-10">

                <img
                    src={profileData.profileImage}
                    alt="profile_img"
                    className="w-40 h-40 rounded-full"
                />

                <div className="text-xl">
                    <p>{profileData.firstName + " " + profileData.lastName}</p>

                    <p>{profileData.username}</p>
                    <p>{profileData.email}</p>
                </div>

            </div>
        </div>
    )
}