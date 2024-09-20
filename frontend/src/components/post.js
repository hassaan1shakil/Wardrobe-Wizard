import Image from "next/image"

export default function Post({post}) {

    return (

        <>
            <div className="flex flex-col gap-1">
                <Image
                    src={post.imageURL}
                    alt={post.caption}
                    width={300}
                    height={300}
                    // layout="intrinsic"
                    className="rounded-xl mb-2"
                />
                <h2>{post.caption}</h2>
                <p>Posted by: {post.user}</p>
            </div>
        </>
    )
}