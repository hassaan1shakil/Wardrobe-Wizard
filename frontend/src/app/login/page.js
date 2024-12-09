'use client'

import Image from "next/image";
import Link from "next/link";
import Login from "@/components/login";
import HomeButton from "@/components/home-button";

export default function LoginPage() {
  return (

    <main className="flex flex-col gap-8 min-h-screen overflow-hidden items-center justify-center font-[family-name:var(--font-geist-sans)] bg-darkPurple">

      <HomeButton />

      <div className="flex flex-col gap-4 justify-center items-center">

        <Image
          src="/images/text-logo2.png"
          alt="Text-Logo"
          width={500}
          height={500}
          priority
        />

        <Login />

        <p>Don't have an account? <Link className="font-bold hover:underline hover:underline-offset-4" href="/register">Sign Up</Link></p>

      </div>

    </main>
  );
}
