'use client'

import Link from "next/link"
import Image from "next/image"

export default function ProfileModal() {

    return (

        <div className="flex flex-col gap-4 rounded bg-PurpleBG fixed top-20 right-32 px-5 py-3 text-white font-bold text-base">

            <Link href="/settings" className="pl-5 pr-9 py-2 rounded-lg shadow-md bg-lightPurple hover:bg-PurpleBG transition-colors flex items-center justify-evenly gap-4">

                <Image
                    src="/images/settings-icon.png"
                    alt="Profile Photo"
                    width={32}
                    height={32}
                    priority
                    className="rounded-full"
                />

                Settings
            </Link>

            {/* Send API Call for Logging Out || href will be replaced with onclick, I guess */}
            <Link href="/settings" className="pl-5 pr-9 py-2 rounded-lg shadow-md bg-lightPurple hover:bg-PurpleBG transition-colors flex items-center justify-evenly gap-4">

                <Image
                    src="/images/logout-icon.png"
                    alt="Profile Photo"
                    width={32}
                    height={32}
                    priority
                    className="rounded-full"
                />

                Log Out
            </Link>

        </div>
    )
}