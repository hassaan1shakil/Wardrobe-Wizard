'use client'

import Image from "next/image";
import { useState, useRef } from "react";
import DeletePostModal from "./delete-post-modal";

export default function OptionsButton({ objectID, handlePostDeleted }) {

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

            {deleteModal && <DeletePostModal
                buttonRef={buttonRef}
                postID={objectID}
                closeDeleteModal={handleClick}
                onPostDeleted={handlePostDeleted}
            />}

        </div>
    )
}