'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { setCookie } from "@/utils/cookieManager";

export default function Login() {
    // Manage state for username, password, and error message
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter()

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Reset error message
        setErrorMessage("");

        try {
            // Perform login logic, making a POST request to your API route
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }), // Send username and password as JSON
            });

            const result = await response.json();

            if (response.ok) {

                // Set tokens as cookies (not HttpOnly, accessible to JavaScript)
                setCookie('access_token', result.access_token, { path: '/' });
                setCookie('refresh_token', result.refresh_token, { path: '/' });

                // Handle successful login (e.g., redirect to dashboard)
                alert("Login successful!");
                router.push('/home')
            } else {
                // Handle login failure, show error message
                setErrorMessage(result.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            // Handle any other errors (e.g., network errors)
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center w-full">
            <form
                className="flex flex-col gap-5 w-full max-w-md mx-auto bg-[#330b41] p-6 rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                {/* Username input field */}
                <div className="flex flex-col">
                    <label htmlFor="username" className="mb-2 text-gray-300">
                        Username
                    </label>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                    />
                </div>

                {/* Password input field */}
                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-2 text-gray-300">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="*******"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                </div>

                {/* Display error message if exists */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                {/* Login button */}
                <button
                    type="submit"
                    className="font-bold rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-darkOrange hover:bg-lightOrange dark:hover:bg-lightOrange hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
