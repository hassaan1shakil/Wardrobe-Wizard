'use client'

import Image from "next/image"

export default function Logo() {

    return (

        <Image
            // className="dark:invert"
            src="/images/final-wizard3.png"
            alt="Next.js logo"
            width={300}
            height={300}
            priority
            // layout="responsive"
        />
    )
}