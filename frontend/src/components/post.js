import Image from "next/image"
import LikeButton from "./like-button"
import OptionsButton from "./options-button"

export default function Post({ post, handlePostDeleted, showOptions }) {

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

                    {showOptions && <OptionsButton
                        objectID={post.id}
                        handlePostDeleted={handlePostDeleted}
                        postFlag={true}
                        articleFlag={false}
                        outfitFlag={false}
                    />}

                </div>

                <div class="flex flex-col">
                    <span class="font-bold mb-1">{post.username} </span>
                    <span class="break-words whitespace-normal">{post.caption}</span>
                </div>

            </div>
        </>
    )
}