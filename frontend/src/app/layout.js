'use client'; // Ensure this is a client component

import localFont from "next/font/local";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
import { useState } from "react"; // Manage QueryClient instance

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Wardrobe Wizard",
//   description: "Simplify your decisions",
// };

export default function RootLayout({ children }) {
  // Initialize QueryClient with useState to persist it across renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the app with QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
