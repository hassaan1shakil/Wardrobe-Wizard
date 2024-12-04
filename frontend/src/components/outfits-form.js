'use client'

import { useState } from "react";
import api from "@/utils/api";
import OutfitPreview from "./outfit-preview";

// components/FormComponent.js
export default function OutfitsForm() {

    const [outfitPreview, setOutfitPreview] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")

    const [previewImages, setPreviewImages] = useState({
        img_top: null,
        img_bottom: null,
        img_footwear: null,
    });

    const [formData, setFormData] = useState({
        theme: '',
        // season: '',
        // gender: '',
        occasion: '',
    });

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (responseMessage)
            setResponseMessage("")
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.put('/generate-outfit/', formData);

            if (response.status === 200) {

                setOutfitPreview(true)

                // call the outfit preview modal here
                setPreviewImages({
                    img_top: response.data.chosen_top,
                    img_bottom: response.data.chosen_bottom,
                    img_footwear: response.data.chosen_footwear
                })

                // implement share outfit and save outfit here too i suppose
            }

            else {
                setResponseMessage(response.data.message || "Your Outfit Could Not Be Generated. Please Try Again Later.")
            }

        } catch (error) {
            setResponseMessage(error.response.data || "An error occurred. Please try again.");

        } finally {

            // Reset to initial state
            setFormData({
                theme: '',
                // season: '',
                // gender: '',
                occasion: '',
            });
        }

    };

    return (
        <div className="flex flex-col items-center">

            <h2 className="text-white text-3xl mb-5">Outfit Wizard</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md mx-auto bg-PurpleBG p-6 rounded-lg shadow-lg font-bold">
                <div className="mb-4">
                    <label htmlFor="type" className="block text-white mb-2">
                        Theme:
                    </label>
                    <select
                        id="theme"
                        name="theme"
                        required
                        value={formData.theme}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md text-black"
                    >
                        <option value="">Select Theme</option>
                        <option value="black">Black</option>
                        <option value="grey">Grey</option>
                        <option value="white">White</option>
                        <option value="blue">Blue</option>
                        <option value="cyan">Cyan</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                        <option value="green">Green</option>
                        <option value="brown">Brown</option>
                    </select>
                </div>

                {/* <div className="mb-4">
                    <label htmlFor="season" className="block text-white mb-2">
                        Season:
                    </label>
                    <select
                        id="season"
                        name="season"
                        required
                        value={formData.season}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md text-black"
                    >
                        <option value="">Select Season</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                        <option value="fall">Fall</option>
                        <option value="winter">Winter</option>
                    </select>
                </div> */}

                {/* <div className="mb-4">
                    <label htmlFor="theme" className="block text-white mb-2">
                        Gender:
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md text-black"
                    >
                        <option value="">Select Gender</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="unisex">Unisex</option>
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                    </select>
                </div> */}

                <div className="mb-4">
                    <label htmlFor="theme" className="block text-white mb-2">
                        Occasion:
                    </label>
                    <select
                        id="occasion"
                        name="occasion"
                        required
                        value={formData.occasion}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md text-black"
                    >
                        <option value="">Select Occasion</option>
                        <option value="casual">Casual</option>
                        {/* <option value="ethnic">Ethnic</option> */}
                        <option value="formal">Formal</option>
                        {/* <option value="party">Party</option>
                        <option value="smart_casual">Smart Casual</option>
                        <option value="sports">Sports</option>
                        <option value="travel">Travel</option> */}
                    </select>
                </div>

                <button type="submit" className="bg-darkOrange hover:bg-lightOrange text-white px-4 py-2 rounded-md text-xl font-bold">
                    Generate Outfit
                </button>
            </form>

            {/* Outfits Preview */}
            {outfitPreview && (
                <OutfitPreview
                    previewImages={previewImages}
                />
            )}

            {/* Display error message if it exists */}
            {responseMessage && <p className="py-5 text-red-500">{responseMessage}</p>}

        </div>
    );
}

