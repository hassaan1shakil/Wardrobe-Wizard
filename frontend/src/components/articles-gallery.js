'use client'

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import ArticlesModal from "./view-articles-modal";
import OptionsButton from "./options-button";

export default function ArticlesGallery({ category }) {   // responseData, Category Name

    // Send API Calls to get data
    // Maintain Cache using React Query
    // Render the received data
    // Pass Invalidate Query function to OutditsModal
    // Pass InvalidateQuery() and objectID to OptionsButton
    // Handle "Delete Article"

    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const queryClient = useQueryClient();

    // Handle clothingArticle click to open modal
    const openModal = (clothingArticle) => {
        setShowModal(true);
        setSelectedArticle(clothingArticle)
    };

    // Handle modal close
    const closeModal = () => {
        setShowModal(false);
        setSelectedArticle(null);
    };

    const fetchClothingArticles = async (type) => {

        const response = await api.get(`/list-articles/?category=${type}`);

        if (response.status !== 200) {
            throw new Error(`Failed to fetch ${type} articles`);
        }
        return response.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["clothingArticles", category],
        queryFn: () => fetchClothingArticles(category),
        staleTime: 5 * 60 * 1000, // 5 minutes in milliseconds to refresh any created posts
        // and ensure that Classification Model has enough time to add tags
        // In future, this can also be added where the classification model completes its request!!!
    });

    // After post is created, invalidate the 'articles' query to refetch
    const handleArcticleChange = (category) => {

        // For now, all 4 categories getting invalidated till the Classification Model gets done******************
        
        // *******************ERROR: Selective Invalidation Not Working***********************************

        queryClient.invalidateQueries(['clothingArticles', category], { exact: true });
        // queryClient.invalidateQueries("clothingArticles", "bottoms", { exact: true });
        // queryClient.invalidateQueries("clothingArticles", "footwear", { exact: true });
        // queryClient.invalidateQueries("clothingArticles", "accessories", { exact: true });
    };

    // console.log(queryClient.getQueryCache());


    function capitalizeFirstLetter(word) {
        if (!word) return ""; // Handle empty or null input
        if (word==="top") word = "tops"
        if (word==="bottom") word = "bottoms"
        if (word==="foot") word = "footwear"
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

    if (isLoading) {
        return (
            <section className="saved-clothingArticles">
                <h2 className="text-white text-3xl mb-4"> {category} </h2>
                <div>Loading Articles...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="saved-clothingArticles">
                <h2 className="text-white text-3xl mb-4"> {category} </h2>
                <div>Error loading {category}: {error.message}</div>
            </section>
        );
    }

    return (
        <section>
            <h2 className="text-white text-3xl mb-4"> {capitalizeFirstLetter(category)} </h2>
            <div className="flex space-x-12 overflow-x-scroll bg-PurpleBG p-6 rounded-lg shadow-lg">
                {data.articles.map((clothingArticle) => (
                    <div
                        key={clothingArticle.id}
                        className="cursor-pointer"
                    >
                        <img
                            src={clothingArticle.articleImage}
                            alt={`clothingArticle ${clothingArticle.id} Thumbnail`}
                            className="w-32 h-32 object-cover rounded-md"
                            onClick={() => openModal(clothingArticle)}
                        />

                        <div className="pl-2 pt-2">
                            <OptionsButton
                                objectID={clothingArticle.id}
                                handlePostDeleted={handleArcticleChange}   // invalidateQuery function
                                postFlag={false}
                                articleFlag={true}
                                outfitFlag={false}
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
