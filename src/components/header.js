'use client'

import Link from 'next/link';

export default function Header(){
  return (
    <header className="bg-darkPurple text-white py-2 sticky top-0 z-50 border-black">
      <nav className="container mx-auto flex items-center justify-between px-4">
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
          <Link href="/support" className="px-4 py-2 rounded-md">Support</Link>
        </div>
        
        {/* Contact/Support Tab */}
        <div className="flex-shrink-0 space-x-4">
          <Link href="/login" className="bg-darkOrange text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-lightOrange transition-colors">
            Login
          </Link>
          <Link href="/register" className="bg-darkOrange text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-lightOrange transition-colors">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};
