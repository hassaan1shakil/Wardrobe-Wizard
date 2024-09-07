import Link from 'next/link';
import Logo from '@/components/logo';
import Header from '@/components/header';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center bg-black text-white p-4">
        {/* Company Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Big Heading */}
        <h1 className="text-8xl font-bold text-white mb-8 text-center">
          simplify your wardrobe
        </h1>

        {/* Small Paragraph */}
        <div className="text-2xl text-gray-300 mb-8 text-center">
          <p>Tired of choosing the right outfit for the occasion?</p>
          <p>Try Wardrobe Wizard to generate amazing outfit pairings so you can always rock in style.</p>
        </div>

        {/* Login / Sign Up Buttons */}
        <div className="flex space-x-4">
          <Link href="/login" className="bg-purple-600 text-white px-12 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
            Login
          </Link>
          <Link href="/signup" className="bg-purple-600 text-white px-12 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
};
