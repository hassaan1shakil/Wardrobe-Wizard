export default function Register() {

    return (

        <div className="flex gap-4 items-center flex-col sm:flex-row">

            <div className="flex flex-col gap-6 items-center">

                <form className="flex flex-col gap-5 w-full max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    {/* <!-- First Name --> */}
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="mb-2 text-gray-300">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="John"
                            required
                        />
                    </div>

                    {/* <!-- Last Name --> */}
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="mb-2 text-gray-300">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Doe"
                            required
                        />
                    </div>

                    {/* <!-- Email --> */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="email@domain.com"
                            required
                        />
                    </div>

                    {/* <!-- Password --> */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="*******"
                            required
                        />
                    </div>

                    {/* <!-- Confirm Password --> */}
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="mb-2 text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="*******"
                            required
                        />
                    </div>

                    {/* <!-- Terms of Service --> */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:ring-2 rounded"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 text-gray-300">I agree to the terms of service</label>
                    </div>

                    {/* <!-- Submit Button --> */}
                    <button
                        type="submit"
                        className="w-full p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p>Already have an account? <a className="font-bold hover:underline hover:underline-offset-4" href="http://localhost:3000/login">Log In</a></p>

            </div>

        </div>

    )
}