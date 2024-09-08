import Image from "next/image";
import Link from "next/link";

export default function Login() {

  return (

    <div className="flex flex-col gap-6 items-center w-full">

      <form className="flex flex-col gap-5 w-full max-w-md mx-auto bg-[#330b41] p-6 rounded-lg shadow-lg" method="POST" action="/login">
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
          className="font-bold rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-darkOrange hover:bg-lightOrange dark:hover:bg-lightOrange hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        >
          Login
        </button>
      </form>

    </div>
  );
}