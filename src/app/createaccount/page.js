import Link from "next/link"
import Image from "next/image"

export default function Createaccount() {

    return (
        <section className="form-section w-full px-4 py-10 bg-gray-50 flex align-center justify-center">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-blue-600">The Medideliver</h1>
                    <p className="text-gray-700 leading-relaxed">
                        Connecting you with compassionate caregivers & trusted medical couriers.
                    </p>
                </div>

                <form action="/overview" className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Email address or phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r
                        from-blue-500 to-indigo-500 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                    >
                        Create Account
                    </button>

                    <div className="flex items-center justify-center gap-3">
                        <hr className="flex-grow border-gray-300" />
                        <span className="text-gray-400 text-sm">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        <Image src="/devicon_google.png" width={20} height={20} alt="Google icon" priority />
                        <span className="text-gray-700 font-medium">Create account with Google</span>
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?
                        <Link href="/login" className="text-blue-600 ml-1 font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </section>

    )
}