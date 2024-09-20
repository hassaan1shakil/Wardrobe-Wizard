'use client'

import Header from "@/components/header";
import CreatePostButton from "@/components/create-post-button";
import Post from "@/components/post";

export default function CommunityPage() {

    // posts will be received from an api call
    const NewPosts = [
        {
            id: 1,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
        {
            id: 2,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
        {
            id: 3,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
        {
            id: 4,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
        {
            id: 5,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
        {
            id: 6,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
        {
            id: 7,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
        {
            id: 8,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
        {
            id: 9,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
        {
            id: 10,
            user: 'Hassaan',
            imageURL: '/images/wizard5.png',
            caption: 'This is an image post'
        },
    ];

    function renderPosts(NewPosts) {

        return (

            <div className="flex flex-wrap gap-10 px-10 py-20 justify-center">
                {NewPosts.map(postObject => (

                    <Post
                        key={postObject.id}
                        post={postObject}
                    />
                ))}

            </div>

        )

    }

    return (
        <div className="bg-darkPurple min-h-screen">

            <Header />

            {/* <div className="fixed top-10 right-20">

                <CreatePostButton />

            </div> */}

            {renderPosts(NewPosts)}

        </div>
    )
}