import { useState } from "react";
import api from "@/utils/api";

export default function UploadModal({ closeModal }) {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [responseMessage, setResponseMessage] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (caption != '')
            formData.append("caption", caption)

        if (image != null)
            formData.append("postImage", image)

        try {
            const response = await api.post('/create-post/', formData);

            if (response.status === 200) {
                setResponseMessage(response.data.message)
            }

            else {
                setResponseMessage(response.data.message || "Post Could Not Be Created. Please Try Again.")
            }

        } catch (error) {
            setResponseMessage(error.message || "An error occurred. Please try again.");

        } finally {

            // Reset to initial state
            setCaption("");
            setImage(null);
            setImagePreview(false);
        }

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-darkPurple rounded-lg shadow-lg w-11/12 sm:w-96 p-6 relative">
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">New Post</h2>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                    {/* File Upload */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block font-bold"
                        >
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full mt-1 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="pt-2">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-auto rounded border border-darkPurple"
                            />
                        </div>
                    )}

                    {/* Caption Input */}
                    <div>
                        <label
                            htmlFor="caption"
                            className="block font-bold"
                        >
                            Caption
                        </label>
                        <textarea
                            id="caption"
                            name="caption"
                            rows="2"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                            className="block w-full mt-1 text-black border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit"
                        className="bg-darkOrange hover:bg-lightOrange w-full text-white px-4 py-2 rounded-md text-xl font-bold">

                        Post
                    </button>

                    {/* Display response message */}
                    {responseMessage && <p className="text-red-500">{responseMessage}</p>}
                </form>
            </div>
        </div>
    );
}
