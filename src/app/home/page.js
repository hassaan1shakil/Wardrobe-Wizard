import Link from 'next/link';
import Logo from '@/components/logo';
import Header from '@/components/header';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      {/* Header will need to render profile icon when signed in!!! */}

      <main className="flex-1 flex flex-row items-center justify-evenly bg-black text-white p-4 bg-darkPurple text-4xl">

        {/* Upload Images */}
        <div className="flex flex-col mb-8 items-center justify-center">

          {/* <div className="text-2xl text-gray-300 mb-8 text-center">
            <p>Wardrobe Wizard lets you generate amazing </p>
            <p> outfit pairings so you can always rock in style.</p>
          </div> */}

          <div>
            <Link href="/wardrobe" className="bg-purple-600 font-bold text-white px-16 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
              My Wardrobe
            </Link>

          </div>
        </div>

        {/* Company Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Generate Outfits */}
        <div className="flex flex-col mb-8 items-center justify-center">

          {/* <div className="text-2xl text-gray-300 mb-8 text-center">
            <p>Wardrobe Wizard lets you generate amazing </p>
            <p> outfit pairings so you can always rock in style.</p>
          </div> */}

          <div>
      
            <Link href="/outfits" className="bg-purple-600 font-bold text-white px-16 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
              My Outfits
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
};
