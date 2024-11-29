'use client';

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api";

export default function UploadArticleModal({ closeUploadModal }) {
    const [images, setImages] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files) {
            setImages(files);
            const previews = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    // Mutation to handle post creation
    const { mutateAsync, isLoading, error } = useMutation({
        mutationFn: async (formData) => {
            const response = await api.post('/upload-article/', formData);
            if (response.status !== 201) {  // remember to keep this 201
                throw new Error(response.data.message || "Articles Could Not Be Created");
            }
            return response.data;
        },
        onSuccess: (data) => {
            setResponseMessage(data.message || "Articles Created Successfully!");
            closeUploadModal();
        },
        onError: (error) => {
            setResponseMessage(error.message || "An error occurred. Please try again.");
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (images !== null) {
            // Loop through the images array and append each one with a unique field name
            images.forEach((image, index) => {
                formData.append(`images_list[${index}]`, image); // appending each image with an indexed name
            });
        }

        // Call the mutation
        try {
            await mutateAsync(formData);
        } catch (error) {
            // Error is handled by onError callback in useMutation
        } finally {
            // Reset to initial state after submission
            setImages(null);
            setImagePreviews([]);
        }
    };

    // Cleaning Up Preview URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    if (isLoading)
        return(<p>Loading beep bop.....</p>)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-darkPurple rounded-lg shadow-lg w-11/12 sm:w-96 p-6 relative">
                {/* Close Button */}
                <button
                    onClick={closeUploadModal}
                    className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-4xl"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">New Articles</h2>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                    {/* File Upload */}
                    <div>
                        <label
                            htmlFor="images"
                            className="block font-bold"
                        >
                            Upload Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/png, image/jpeg"
                            multiple // Allow multiple file selection
                            onChange={handleImageChange}
                            className="block w-full mt-1 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                        <div className="pt-2 grid grid-cols-2 gap-2">
                            {imagePreviews.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-auto rounded border border-darkPurple"
                                />
                            ))}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`bg-darkOrange hover:bg-lightOrange w-full text-white px-4 py-2 rounded-md text-xl font-bold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Posting..." : "Post"}
                    </button>

                    {/* Display response message */}
                    {responseMessage && <p className="text-red-500">{responseMessage}</p>}
                </form>
            </div>
        </div>

    );
}
