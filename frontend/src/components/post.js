import Image from "next/image"
import LikeButton from "./like-button"
import OptionsButton from "./options-button"

export default function Post({ post, handlePostDeleted }) {

    // Add useSate() here or React Query
    // Add handleDeletePost here

    return (

        <>
            <div className="flex flex-col gap-1 max-w-[15vw]">
                <Image
                    src={post.postImage}
                    alt={post.caption}
                    width={300}
                    height={300}
                    // layout="intrinsic"
                    className="rounded-xl mb-2 object-cover overflow-hidden"
                />

                <div className="flex justify-between pr-1">
                    <LikeButton
                        postID={post.id}
                        likesCount={post.likes.length}
                        likeStatus={post.liked_by_user}
                    />

                    <OptionsButton
                        objectID={post.id}
                        handlePostDeleted={handlePostDeleted}
                    />
                </div>

                <div class="flex flex-col">
                    <span class="font-bold mb-1">{post.username} </span>
                    <span class="break-words whitespace-normal">{post.caption}</span>
                </div>

                {/* Add Delete Post Modal here */}

            </div>
        </>
    )
}