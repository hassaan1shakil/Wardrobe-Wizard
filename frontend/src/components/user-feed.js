'use client'

import { useState, useEffect } from "react"
import Post from "@/components/post";
import api from "@/utils/api";

export default function UserFeed() {

    const [feedPosts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchPosts = async () => {

            try {
                const response = await api.get('/list-posts/', {
                    params: {
                        category: "user"    // setting user for checking
                    }
                });

                if (response.status !== 200) {
                    throw new Error("Couldn't Fetch Posts")
                }

                const data = response.data;
                setPosts(data.posts);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        fetchPosts();

    }, [])

    function renderPosts(posts) {

        if (posts) {
            return (

                <div className="flex flex-wrap gap-10 px-10 py-14 justify-center">
                    {posts.map(postObject => (

                        <Post
                            key={postObject.id}
                            post={postObject}
                        />
                    ))}

                </div>
            )
        }

        else {
            return null;
        }

    }

    if (loading)
        return (
            <div className="bg-darkPurple min-h-screen">

                Loading Posts...

            </div>
        )

    if (error)
        return (
            <div className="bg-darkPurple min-h-screen">

                Error: {error}

            </div>
        )

    console.warn(feedPosts.posts)

    return (
        <div className="mt-14">

            <h1 className="flex text-4xl justify-center">My Posts</h1>

            <div className="bg-darkPurple min-h-screen flex justify-evenly">

                {renderPosts(feedPosts)}

            </div>

        </div>

    )
}