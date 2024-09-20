'use client'

import { useState } from "react"

export default function DeleteProfile() {

    const handleAccountDeletion = () => {
        // Add deletion logic (e.g., API call to delete the account)
        alert('Are you sure you want to delete your account? This action is irreversible.');
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
            </div>
        </>
    )
}