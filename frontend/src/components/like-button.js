import { useState, useEffect } from "react";
import api from "@/utils/api";

export default function LikeButton({ postID, likesCount, likeStatus }) {

    const [likeButton, setLikeButton] = useState(false);
    const [numLikes, setNumLikes] = useState(0)
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        // Initialize LikeState from liked_by_user when the post data is loaded
        setLikeButton(likeStatus);
        setNumLikes(likesCount);
    }, [likeStatus, likesCount]);       // not including local sates --> infinite rendering

    const ToggleLike = async () => {

        const previousLikedState = likeButton;   // saving prev state just in case
        const previousLikesCount = numLikes;

        try {
            const response = await api.post('/toggle-like/', {post_id: postID});

            if (response.status === 200) {
                setLikeButton(!likeButton);      // toggle like
                
                // Handle LikesCount

                if (!previousLikedState)        // using previous state since the state change is async
                    setNumLikes((prevCount) => prevCount + 1);
                else
                    setNumLikes((prevCount) => prevCount - 1);
            }

            else
                throw new Error("Could not like post")

        } catch (error) {
            setErrorMessage(error.message);
            console.log(errorMessage)
            setLikeButton(previousLikedState);
            setNumLikes(previousLikesCount);
        }
    };

    return (

        <div className="flex justify-left items-center">
            <button onClick={ToggleLike}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={likeButton ? 'red' : 'none'}
                    stroke={likeButton ? 'red' : 'currentColor'}
                    strokeWidth={2}
                    className="w-7 h-7 text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21c-4.1-4.6-8-8.6-8-11.5 0-2.4 1.9-4.5 4.5-4.5 1.7 0 3.3 1.1 4 2.6 0.7-1.5 2.3-2.6 4-2.6 2.6 0 4.5 2.1 4.5 4.5 0 2.9-3.9 6.9-8 11.5z"
                    />
                </svg>
            </button>

            <p className="px-1 pt-1"> {numLikes}</p>
            
        </div>
    )
}