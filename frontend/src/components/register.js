'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Register() {
    // Manage form state
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profile_image, setProfileImage] = useState("");
    // setProfileImage(null)    // Default State
    const [terms, setTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter()

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error message
        setErrorMessage("");

        // Front-end validation to ensure all fields are filled in
        if (!first_name || !last_name || !email || !username || !password || !confirmPassword || !terms) {
            setErrorMessage("All fields are required.");
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        if (profile_image) {
            formData.append("profile_image", profile_image); // Ensure profile_image is the actual file, not a URL or base64 string
        }

        // Perform the registration logic, e.g., send data to your API endpoint
        try {
            const response = await fetch("http://127.0.0.1:8000/api/signup/", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                // Handle successful registration (e.g., redirect to login or dashboard)
                alert("Registration successful!");
                router.push('/login')
            } else {
                // Handle failure
                setErrorMessage(result.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center w-full">
            <form
                className="flex flex-col gap-5 w-full max-w-lg mx-auto bg-[#330b41] p-6 rounded-lg shadow-lg"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                {/* First Name */}
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="mb-2 text-gray-300">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="John"
                        required
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)} // Update first name state
                    />
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="mb-2 text-gray-300">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Doe"
                        required
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)} // Update last name state
                    />
                </div>

                {/* Username */}
                <div className="flex flex-col">
                    <label htmlFor="username" className="mb-2 text-gray-300">Username</label>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update email state
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 text-gray-300">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="email@domain.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-2 text-gray-300">Password</label>
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

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="mb-2 text-gray-300">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="*******"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                    />
                </div>

                {/* Profile Image */}
                <div className="flex flex-col">
                    <label htmlFor="profile_image" className="mb-2 text-gray-300">Profile Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="profile_image"
                        name="profile_image"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="profile_image"
                        onChange={(e) => setProfileImage(e.target.files[0])} // Update profile_image state
                    />
                </div>

                {/* Terms of Service */}
                <div className="flex items-center justify-center">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:ring-2 rounded"
                        required
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)} // Update terms state
                    />
                    <label htmlFor="terms" className="ml-2 text-gray-300">I agree to the terms of service</label>
                </div>

                {/* Display error message if it exists */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-3 bg-darkOrange text-white rounded-lg font-semibold hover:bg-lightOrange transition duration-300"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
