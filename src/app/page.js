import Link from 'next/link';
import Logo from '@/components/logo';
import Header from '@/components/header';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-white p-4 bg-darkPurple">
        {/* Company Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Big Heading */}
        <h1 className="text-8xl font-bold text-white mb-4 text-center">
          simplify your
        </h1>
        <h1 className="text-8xl font-bold text-white mb-8 text-center">
          decisions
        </h1>

        {/* Small Paragraph */}
        <div className="text-2xl text-gray-300 mb-8 text-center">
          <p>Wardrobe Wizard lets you generate amazing </p>
          <p> outfit pairings so you can always rock in style.</p>
        </div>

        {/* Get Buttons */}
        <div>
          <Link href="/signup" className="bg-darkOrange text-2xl font-bold text-white px-16 py-3 rounded-lg shadow-md hover:bg-lightOrange transition-colors">
            Get Started!
          </Link>
        </div>
      </main>
    </div>
  );
};
