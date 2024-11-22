'use client';

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api";


export default function DeleteArticleModal({ buttonRef, articleID, closeDeleteModal, onPostDeleted }) {

    const [modalStyle, setModalStyle] = useState({});
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            setModalStyle({
                position: "absolute",
                top: rect.top + scrollTop + 65, // Adjust height above the button
                left: rect.left - 3,
                transform: "translateY(-100%)",
            });
        }

        // Disable outside elements except the modal and options button
        const disableOutsideClick = () => {
            const modalElement = document.querySelector("#deleteModal"); // Ensure modal has a unique ID
            const elementsToDisable = document.querySelectorAll("button, a, input, textarea");

            elementsToDisable.forEach((el) => {
                if (!buttonRef.current.contains(el) && // Not the options button
                    (!modalElement || !modalElement.contains(el))) // Not part of the modal
                {
                    el.setAttribute("disabled", "true");
                }
            });
        };

        disableOutsideClick();

        return () => {
            // Re-enable elements after modal is closed
            document.querySelectorAll("button, a, input, textarea").forEach((el) => {
                el.removeAttribute("disabled");
            });
        };
    }, [buttonRef]);

    // Mutation to handle post creation
    const { mutateAsync, isLoading, error } = useMutation({
        mutationFn: async (requestData) => {
            const response = await api.delete('/delete-article/', { data: requestData });
            if (response.status !== 200) {  // remember to keep this 201
                throw new Error(response.data.message || "Post Could Not Be Deleted");
            }
            return response.data;
        },
        onSuccess: (data) => {
            setResponseMessage(data.message || "Post Deleted Successfully!");
            closeDeleteModal();
            onPostDeleted("tops") // Notify Parent to invalidate query
        },
        onError: (error) => {
            setResponseMessage(error.message || "An error occurred. Please try again.");
        }
    });

    const handleDeleteButton = async (e) => {
        e.preventDefault();

        const confirmation = window.confirm('Delete Article?')

        if (confirmation) {
            const payload = { article_id: articleID };

            // Call the mutation
            try {
                await mutateAsync(payload);
            } catch (error) {
                // Error is handled by onError callback in useMutation
            }
        }

        else {
            // Close Modal
            closeDeleteModal();
        }
    };

    return (
        <div
            id="deleteModal"
            className="  rounded-md text-center"
            style={modalStyle}
        >
            <button
                onClick={handleDeleteButton}
                className="bg-darkOrange px-3 py-1 rounded hover:bg-lightOrange"
            >
                <p className="font-bold">Delete Article</p>
            </button>
        </div>
    );
};