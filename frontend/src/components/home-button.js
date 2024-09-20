import Image from "next/image";
import Link from "next/link";

export default function HomeButton() {

    return (
        <div className="fixed left-8 top-8">
            <Link className="font-bold hover:underline hover:underline-offset-4" href="/">
                <div class="w-20 h-20 p-4 bg-[#330b41] rounded-full">

                    <Image
                        src="/images/home.png"
                        alt="Next.js logo"
                        width={200}
                        height={200}
                        priority
                    />

                </div>
            </Link>
        </div>
    );
};