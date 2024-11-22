'use client'

import { useState } from "react";
import ArticlesGallery from "@/components/articles-gallery"
import UploadArticleModal from "./upload-article-modal";

export default function WardrobeSection() {

    // Pass Data to Article Galleries + Add "type" attribute to each article which will hepli in invalidating query
    // Handle "Add Clothing Articles"
    // ***Check for incoming data and any unncessary fields***
    // ***Initialize tagsList in models.py***
    // ***Send articleImage as a solid URL***

    const [uploadModal, setUploadModal] = useState(false);

    const openUploadModal = () => {
        setUploadModal(true);
    };

    const closeUploadModal = () => {
        setUploadModal(false);
    };

    return (
        <div className='flex flex-col bg-darkPurple min-h-screen'>

            <div className='flex flex-col p-12'>

                {/* Add To Wardrobe Button */}
                <div className="flex flex-row justify-end items-center pr-20 gap-10">
                    <p>(New Clothing Articles May Take Upto 5 Minutes To Appear In The Wardrobe)</p>

                    <button type="submit" onClick={openUploadModal} className="bg-darkOrange hover:bg-lightOrange text-white px-4 py-2 rounded-md text-xl font-bold">
                        Add To Wardrobe
                    </button>
                </div>

                {/* Upload Article Modal */}
                {uploadModal && <UploadArticleModal
                    closeUploadModal={closeUploadModal}
                />}

                <div className="flex flex-col gap-8">

                    {/* Saved Article Section */}
                    <ArticlesGallery
                        category={"tops"}
                    />

                    <ArticlesGallery
                        category={"bottoms"}
                    />

                    <ArticlesGallery
                        category={"footwear"}
                    />

                    <ArticlesGallery
                        category={"accessories"}
                    />

                </div>

            </div>

        </div>
    );
};