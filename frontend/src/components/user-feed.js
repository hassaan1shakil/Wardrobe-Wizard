'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useQueryClient } from "@tanstack/react-query/build/legacy";
import { useState } from "react";
import Image from "next/image";
import Post from "@/components/post";
import api from "@/utils/api";
import UploadPostModal from "./upload-post-modal";


export default function UserFeed() {
    // Upload Post Modal
    const [uploadModal, setUploadModal] = useState(false);
    const queryClient = useQueryClient();

    const openUploadModal = () => {
        setUploadModal(true);
    };

    const closeUploadModal = () => {
        setUploadModal(false);
    };

    // Fetch posts using useQuery
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["userPosts"],
        queryFn: async () => {
            const response = await api.get("/list-posts/", {
                params: { category: "user" },
            });
            return response.data.posts;
        },
    });

    // After post is created, invalidate the 'posts' query to refetch
    const handlePostCreated = () => {
        queryClient.invalidateQueries('userPosts'); // This will trigger a refetch of posts
    };

    function renderPosts(posts) {
        if (posts) {
            return (
                <div className="flex flex-wrap gap-x-12 gap-y-10 px-36 py-14 justify-start content-start">
                    {posts.map((postObject) => (
                        <Post key={postObject.id} post={postObject} />
                    ))}
                </div>
            );
        } else {
            return null;
        }
    }

    if (isLoading)
        return (
            <div className="bg-darkPurple min-h-screen">
                Loading Posts...
            </div>
        );

    if (isError)
        return (
            <div className="bg-darkPurple min-h-screen">
                Error: {error.message}
            </div>
        );

    return (
        <div className="mt-14">
            <div className="flex text-4xl justify-center gap-4">
                <h1>My Posts</h1>
                <button className="rounded-md" onClick={openUploadModal}>
                    <Image
                        src="/images/plus-icon.png"
                        alt="add-post"
                        width={32}
                        height={32}
                        priority
                    />
                </button>
            </div>

            <div className="bg-darkPurple min-h-screen flex justify-evenly">
                {renderPosts(data)}
            </div>

            {uploadModal && <UploadPostModal closeUploadModal={closeUploadModal} onPostCreated={handlePostCreated}/>}
        </div>
    );
}
