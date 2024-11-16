'use client'

import { useState, useEffect } from "react"
import Router from "next/router";
import api from '@/utils/api'
import { removeCookie } from "@/utils/cookieManager";

export default function DeleteProfile() {

    const [errorMessage, setErrorMessage] = useState("");
    // const router = useRouter();

    const handleAccountDeletion = async () => {
        // Make alert/button here for Yes/No
        const confirmation = window.confirm('Are you sure you want to delete your account? This action is irreversible.')

        if (confirmation){

            try {
                // Make deletion request
    
                // 1) make an api call to get the username of the user on the basis of the JWT Tokens
                const response_username = await api.get('/get-user-info/');
                console.log('Username: ', response_username.data.username);
                
                // 2) using the username, send the delete request to the backend
                const response = await api.delete('/delete-user/', {
                    data: { username: response_username.data.username }  // Use the `data` field to send the request body
                });
    
                if (response.status === 200) { 
    
                    // // Clear the cookies
                    removeCookie('access_token');
                    removeCookie('refresh_token');
    
                    // Redirect to home page
                    alert("Account Deletion Successful!");
                    // Router.push('/register').then(() => window.location.reload());
                    window.location.href = '/register'; // Redirects the user to the register page
    
                } else {
                    setErrorMessage(response.data.message || "Your Request Could Not Be Processed At The Moment. Please Try Again Later.");
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

                {/* Display error message if it exists */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </>
    )
}