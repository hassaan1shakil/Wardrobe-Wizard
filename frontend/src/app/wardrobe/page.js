'use client'

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import OutfitsGallery from "@/components/outfits-gallery"
import OutfitsModal from "@/components/upload-modal"

export default function WardrobePage() {

    // Galleries

    // Dummy saved outfits data //**send api call to retrieve data */
    const savedTops = [
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

    // Dummy saved outfits data //**send api call to retrieve data */
    const savedBottoms = [
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

    // Dummy saved outfits data //**send api call to retrieve data */
    const savedFootwear = [
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

    // Dummy saved outfits data //**send api call to retrieve data */
    const savedAccessories = [
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


    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedOutfit, setSelectedOutfit] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    return (
        <div className='flex flex-col bg-darkPurple min-h-screen'>

            <Header />

            <div className='flex flex-col p-12'>

                {/* Create Functions for Both Buttons + API Calls */}
                <div className="flex flex-row gap-5 justify-end items-center">   
                    <button type="submit" className="bg-darkOrange hover:bg-lightOrange text-white px-4 py-2 rounded-md text-xl font-bold">
                        Add To Wardrobe
                    </button>

                    <button type="submit" className="bg-darkOrange hover:bg-lightOrange text-white px-4 py-2 rounded-md text-xl font-bold">
                        Remove From Wardrobe
                    </button>
                </div>

                <div className="flex flex-col gap-8">

                    {/* Saved Outfits Section */}
                    <OutfitsGallery
                        savedObjects={savedTops}
                        openModal={openModal}
                        text={"Tops"}
                    />

                    <OutfitsGallery
                        savedObjects={savedBottoms}
                        openModal={openModal}
                        text={"Bottoms"}
                    />

                    <OutfitsGallery
                        savedObjects={savedFootwear}
                        openModal={openModal}
                        text={"Footwear"}
                    />

                    <OutfitsGallery
                        savedObjects={savedAccessories}
                        openModal={openModal}
                        text={"Accessories"}
                    />

                    {/* Modal for displaying enlarged images */}
                    {showModal && (
                        <OutfitsModal
                            selectedOutfit={selectedOutfit}
                            currentImageIndex={currentImageIndex}
                            closeModal={closeModal}
                            prevImage={prevImage}
                            nextImage={nextImage}
                        />
                    )}

                </div>

            </div>

        </div>
    );
};