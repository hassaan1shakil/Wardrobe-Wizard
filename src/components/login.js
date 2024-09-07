export default function Login() {

    return (

        <div className="flex gap-4 items-center flex-col sm:flex-row">
  
      <div className="flex flex-col gap-6 items-center">
  
        <form className="flex flex-col gap-5 w-full max-w-md mx-auto" method="POST" action="/login">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-gray-300"></label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="email@domain.com"
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-gray-300"></label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="*******"
              required
            />
          </div>
  
          <button
            type="submit"
            className="font-bold rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            Login
          </button>
        </form>
  
        {/* This is not Internal Routing I think as the page is redirecting everytime */}
        <p>Don't have an account? <a className="font-bold hover:underline hover:underline-offset-4" href="http://localhost:3000/register">Sign Up</a></p> 
  
      </div>

      </div>
    );
  }