import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <header className="w-full p-6 bg-white shadow-md text-center">
        <h1 className="text-4xl font-extrabold text-blue-600">MediDeliver</h1>
        <p className="text-gray-600 mt-2 text-lg">Connecting You to Healthcare Providers & Couriers</p>
      </header>

      {/* Hero Section with Background Image */}
      <main className="relative w-full h-[80vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png"  // Replace with the actual image path
            alt="Healthcare Delivery"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold">
            Delivering Healthcare, One Package at a Time
          </h1>
          <p className="mt-4 text-lg max-w-lg mx-auto">
            Get medications and medical supplies delivered fast, securely, and hassle-free. Join our network of trusted caregivers and couriers today!
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center">
            <Link href="/createaccount" className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-200 transition">
              Create An Account
            </Link>
            <Link href="/becomeacaregiver" className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-700 transition">
              Become A Caregiver
            </Link>
            <Link href="/becomeacourier" className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-yellow-600 transition">
              Become A Courier
            </Link>
          </div>
        </div>
      </main>

      {/* Search Section */}
      <div className="w-[90%] mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-xl font-bold text-gray-800">Find A Medical Courier Or Caregiver</h3>
        <div className="flex mt-4">
          <input
            className="flex-1 p-3 border rounded-l-lg outline-none text-gray-700"
            placeholder="🔍 Enter your zip code or location"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg font-bold hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      {/* Why MediDeliver Section */}
      <div className="w-[90%] mt-10 bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-2xl font-extrabold text-blue-600 mb-4">Why MediDeliver?</h3>
        <ul className="text-gray-700 space-y-3 text-lg">
          <li><strong>Effortless Access</strong> – Easily schedule medical deliveries.</li>
          <li><strong>Trusted Couriers</strong> – Verified professionals ensure safe handling.</li>
          <li><strong>Real-Time Tracking</strong> – Monitor your deliveries live.</li>
          <li><strong>Secure Compliance</strong> – Adheres to healthcare transport standards.</li>
          <li><strong>Integrated Solutions</strong> – Works seamlessly with hospitals & pharmacies.</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 mt-8 bg-white text-center shadow-md">
        <p className="text-gray-600">© 2025 MediDeliver. All rights reserved.</p>
      </footer>
    </section>
  );
}
