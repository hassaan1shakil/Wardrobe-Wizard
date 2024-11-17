'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ProfileIcon from './profile-icon';

export default function Header() {
  const [isMounted, setIsMounted] = useState(false); // Track if the component has mounted


  useEffect(() => {
    // Mark component as mounted only after the component mounts
    setIsMounted(true);
  }, []);

  // Render logic based on the router pathname
  const renderHeaderContent = () => {
    if (!isMounted) {
      return null;  // Prevent rendering before mount
    }

    else {

      switch (usePathname()) {    // usePathname() + next/navigation solved the issue
        case '/':
          return (
            <div className="flex-shrink-0 space-x-4">
              <Link href="/login" className="bg-darkOrange text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-lightOrange transition-colors">
                Login
              </Link>
              <Link href="/register" className="bg-darkOrange text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-lightOrange transition-colors">
                Sign Up
              </Link>
            </div>
          );

        default:
          return (
            <ProfileIcon />
          );

      }
    }
  };

  // Ensure the return statement handles content correctly
  return (
    <header className="bg-darkPurple text-white py-2 sticky top-0 z-50 border-black">
      <nav className="container mx-auto flex items-center justify px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <img src="/images/text-logo2.png" alt="Logo-Text" className="h-10" />
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex-grow flex items-end justify-center space-x-4 text-lg text-blue-100 font-bold">
          <Link href="/home" className="px-4 py-2 rounded-md">Home</Link>
          <Link href="/wardrobe" className="px-4 py-2 rounded-md">Wardrobe</Link>
          <Link href="/outfits" className="px-4 py-2 rounded-md">Outfits</Link>
          <Link href="/community" className="px-4 py-2 rounded-md">Community</Link>
          <Link href="/profile" className="px-4 py-2 rounded-md">Profile</Link>
          <Link href="/about" className="px-4 py-2 rounded-md">About</Link>
        </div>

        {/* Render header content based on the route */}
        {renderHeaderContent()}
      </nav>
    </header>
  );
}
