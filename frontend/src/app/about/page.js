import React from 'react';
import Header from '@/components/header';

export default function AboutPage() {
  return (
    <div className='flex flex-col gap-10 bg-darkPurple'>

      <Header />

      <div className="min-h-screen text-white flex flex-col gap-8 justify-center items-center px-4">

        <h1 className="text-4xl font-bold">About This Project</h1>

        {/* About/Description Section */}
        <div className="flex flex-col gap-4 bg-PurpleBG p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold">Project Description</h2>
          <p className='text-lg'>
            This project is designed to streamline and automate [insert specific purpose here].
            The main goal is to provide an efficient solution for [describe the core functionality or purpose].
            Whether you are using this platform for [target audience/industries], the tools and resources provided aim
            to optimize your workflow and enhance productivity.
          </p>
        </div>

        {/* Technical Info Section */}
        <div className="flex flex-col gap-4 bg-PurpleBG p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold">Technical Information</h2>
          <p className='text-lg'>
            The project is built using the following technologies:
          </p>
          <ul className="list-disc ml-5 text-lg">
            <li>Framework: <strong>Next.js</strong> for server-side rendering and optimized routing.</li>
            <li>Styling: <strong>Tailwind CSS</strong> for rapid UI development and responsive design.</li>
            <li>Deployment: Hosted and deployed via <strong>Vercel</strong>.</li>
            <li>API Integration: [Describe any APIs used, if applicable].</li>
            <li>Other Tools: [Mention any additional tools or libraries such as Make.com, Zapier, etc.].</li>
          </ul>
          <p className='text-lg'>
            The system is designed to be scalable and modular, with components that can be easily extended or adapted
            to meet future requirements.
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-col gap-4 bg-PurpleBG p-8 rounded-lg shadow-lg w-full max-w-2xl mb-10">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <ul className="list-disc ml-5 text-lg">
            <li>
              <strong>Email:</strong> <a href="mailto:support@example.com" className="text-blue-400 hover:underline">support@example.com</a>
            </li>
            <li>
              <strong>GitHub:</strong> <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub Repository</a>
            </li>
            <li>
              <strong>Twitter:</strong> <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@YourProfile</a>
            </li>
          </ul>
        </div>
      </div>

    </div>


  );
};
