import Link from "next/link"
import Image from "next/image"
export default function Login() {
  return (
    <section className="w-full px-4 py-10 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-blue-600">The Medideliver</h1>
          <p className="text-gray-700">
            Connecting you to compassionate caregivers & reliable medical couriers.
          </p>
        </div>

        <form className="space-y-4 w-full">
          <input
            type="text"
            placeholder="Email address or phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r
              from-blue-500 to-indigo-500 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>

          <div className="flex items-center justify-center gap-3">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Image src="/devicon_google.png" width={20} height={20} alt="Google icon" priority />
            <span className="text-gray-700 font-medium">Log in with Google</span>
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?
            <Link href="/createaccount" className="text-blue-600 font-medium ml-1 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </section>

  )
} 