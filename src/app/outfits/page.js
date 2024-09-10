'use client'

import { useState } from 'react';
import Header from '@/components/header';
import OutfitsForm from '@/components/outfits-form';
import OutfitsGallery from '@/components/outfits-gallery';
import OutfitsModal from '@/components/outfits-modal';

export default function OutfitsPage() {
    // Form state
    const [formData, setFormData] = useState({
        type: '',
        theme: '',
        season: ''
    });

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

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedOutfit, setSelectedOutfit] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData); // *** send api call here ***
    };

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
        <div className='flex flex-col bg-darkPurple min-h-screen overflow-hidden'>

            <Header />

            <div className='flex flex-col p-12 gap-16'>

                <div>

                    {/* Saved Outfits Section */}
                    <OutfitsGallery savedObjects={savedOutfits} openModal={openModal} text={"Saved Outfits"}/>

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


                {/* Form Section */}
                <OutfitsForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />

            </div>

        </div>
    );
}
