import Link from 'next/link';

export default function Header(){
  return (
    <header className="bg-gray-800 text-white py-2 sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
              <img src="/logo.png" alt="Logo" className="h-8" />
          </Link>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex-grow flex items-center justify-center space-x-4">
          <Link href="/" className="px-4 py-2 rounded-md hover:bg-gray-700">Home</Link>
          <Link href="/about" className="px-4 py-2 rounded-md hover:bg-gray-700">About</Link>
          <Link href="/services" className="px-4 py-2 rounded-md hover:bg-gray-700">Services</Link>
          <Link href="/blog" className="px-4 py-2 rounded-md hover:bg-gray-700">Blog</Link>
          <Link href="/portfolio" className="px-4 py-2 rounded-md hover:bg-gray-700">Portfolio</Link>
        </div>
        
        {/* Contact/Support Tab */}
        <div className="flex-shrink-0">
          <Link href="/contact" className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700">
            Contact/Support
          </Link>
        </div>
      </nav>
    </header>
  );
};
