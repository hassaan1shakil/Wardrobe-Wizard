'use client'

import Header from "@/components/header";
import UserInfo from "@/components/user-info";
import UserFeed from "@/components/user-feed";

export default function ProfilePage() {
    
    return (
        <div className="bg-darkPurple min-h-screen">

            <Header />

            <UserInfo />

            <UserFeed />

        </div>
    )
}