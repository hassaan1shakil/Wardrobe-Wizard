'use client'

import Image from "next/image";
import { useState, useRef } from "react";
import DeletePostModal from "./delete-post-modal";
import DeleteArticleModal from "./delete-article-modal";

export default function OptionsButton({ objectID, handlePostDeleted, postFlag, articleFlag, outfitFlag }) {

    const [deleteModal, setDeleteModal] = useState(false);
    const buttonRef = useRef(null);

    const handleClick = () => {

        setDeleteModal(!deleteModal);   // Toggle Modal
    };

    return (

        <div className="flex justify-left items-center">
            <button
                ref={buttonRef}
                onClick={handleClick}
            >
                <Image
                    src="/images/three-dots.png"
                    alt="Options Button"
                    width={28}
                    height={28}
                    priority
                />
            </button>

            {/* Conditionally Render the Options Button for Post, Article & Gallery */}

            {deleteModal && postFlag && <DeletePostModal
                buttonRef={buttonRef}
                postID={objectID}
                closeDeleteModal={handleClick}
                onPostDeleted={handlePostDeleted}
            />}

            {deleteModal && articleFlag && <DeleteArticleModal
                buttonRef={buttonRef}
                articleID={objectID}
                closeDeleteModal={handleClick}
                onPostDeleted={handlePostDeleted}
            />}

            {/* {deleteModal && outfitFlag && <DeleteOutfitModal
                buttonRef={buttonRef}
                postID={objectID}
                closeDeleteModal={handleClick}
                onPostDeleted={handlePostDeleted}
            />} */}

        </div>
    )
}