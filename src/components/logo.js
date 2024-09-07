import Image from "next/image"

export default function Logo() {

    return (

        <>
            <Image
                className="dark:invert"
                src="https://nextjs.org/icons/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
        </>
    )
}