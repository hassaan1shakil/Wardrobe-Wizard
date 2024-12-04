'use client'

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import ArticlesModal from "./view-articles-modal";
import OptionsButton from "./options-button";

export default function OutfitsGallery({ category }) {   // responseData, Category Name

    // Dummy saved outfits data //**send api call to retrieve data */
    const savedOutfits = [
        {
            id: 1,
            images: [
                '/images/wizard5.png',
                '/images/wizard6.png',
                '/images/wizard7.png'
            ]
        },
        {
            id: 2,
            images: [
                '/images/final-wizard3.png',
                '/images/wizard5.png',
                '/images/wizard7.png'
            ]
        }
    ];

    const OutfitPreviewResponse = {

        img_top: '/images/final-wizard3.png',
        img_bottom: '/images/wizard7.png',
        img_footwear: '/images/wizard6.png',
        img_accessory: '/images/wizard5.png'
    }

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedOutfit, setSelectedOutfit] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFormSubmitted, setFormSubmission] = useState(false);
    const [apiResponse, setApiResponse] = useState(false);

    // Handle outfit click to open modal
    const openModal = (outfit) => {
        setSelectedOutfit(outfit);
        setCurrentImageIndex(0);
        setShowModal(true);
    };

    // Handle modal close
    const closeModal = () => {
        setShowModal(false);
        setSelectedOutfit(null);
    };

    // Cycle to the next image
    const nextImage = () => {
        if (selectedOutfit) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === selectedOutfit.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    // Cycle to the previous image
    const prevImage = () => {
        if (selectedOutfit) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? selectedOutfit.images.length - 1 : prevIndex - 1
            );
        }
    };

    // Send API Calls to get data
    // Maintain Cache using React Query
    // Render the received data
    // Pass Invalidate Query function to OutditsModal
    // Pass InvalidateQuery() and objectID to OptionsButton
    // Handle "Delete Article"

    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedOutfit] = useState(null);
    const queryClient = useQueryClient();

    // Handle clothingArticle click to open modal
    const openModal = (savedOutfit) => {
        setShowModal(true);
        setSelectedOutfit(savedOutfit)
    };

    // Handle modal close
    const closeModal = () => {
        setShowModal(false);
        setSelectedOutfit(null);
    };

    const fetchClothingArticles = async (type) => {

        const response = await api.get("/list-saved-articles/");    // add data here

        if (response.status !== 200) {
            throw new Error(`Failed to fetch saved outfits`);
        }
        return response.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["savedOutfits"],
        queryFn: () => fetchClothingArticles(),
    });

    const handleOutfitChange = () => {

        queryClient.invalidateQueries(['savedOutfits']);
    };

    if (isLoading) {
        return (
            <section className="saved-clothingArticles">
                <h2 className="text-white text-3xl mb-4"> {category} </h2>
                <div>Loading Saved Outfits...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="saved-clothingArticles">
                <h2 className="text-white text-3xl mb-4"> {category} </h2>
                <div>Error Loading Saved Outfits: {error.message}</div>
            </section>
        );
    }

    return (
        <section>
            {/* Modal for displaying enlarged images */}
            {/* {showModal && (
                <OutfitsModal
                    selectedOutfit={selectedOutfit}
                    currentImageIndex={currentImageIndex}
                    closeModal={closeModal}
                    prevImage={prevImage}
                    nextImage={nextImage}
                />
            )} */}

            <h2 className="text-white text-3xl mb-4"> Saved Outfits </h2>
            <div className="flex space-x-12 overflow-x-scroll bg-PurpleBG p-6 rounded-lg shadow-lg">
                {data.articles.map((savedOutfit) => (
                    <div
                        key={savedOutfit.id}
                        className="cursor-pointer"
                    >
                        <img
                            src={savedOutfit.articleImage}
                            alt={`clothingArticle ${savedOutfit.id} Thumbnail`}
                            className="w-32 h-32 object-cover rounded-md"
                            onClick={() => openModal(savedOutfit)}
                        />

                        <div className="pl-2 pt-2">
                            <OptionsButton
                                objectID={savedOutfit.id}
                                handlePostDeleted={handleOutfitChange}   // invalidateQuery function
                                postFlag={false}
                                articleFlag={false}
                                outfitFlag={true}
                            />
                        </div>


                    </div>
                ))}
            </div>

            {/* Modal for displaying enlarged images */}
            {showModal && <ArticlesModal selectedArticle={selectedArticle} closeArticleModal={closeModal} />}

        </section>
    );
}
