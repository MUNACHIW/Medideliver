"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const nav = document.getElementById("nav");

    const handleScroll = () => {
      if (!nav) return;
      if (window.scrollY > 100) {
        nav.classList.add("open");
      } else {
        nav.classList.remove("open");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-50  ">
      {/* Header */}
      <header id="nav" className="w-full p-6  nav-feature    bg-white shadow-md text-center fixed top-0 z-100 ">
        <h1 className="text-4xl font-extrabold  text-blue-600">MediDeliver</h1>
        <p className="text-gray-600 mt-2 text-lg">Connecting You to Healthcare Providers & Couriers</p>
      </header>

      {/* Hero Section with Background Image */}
      <main className="relative w-full h-[80vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white   rounded-[50px]">
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
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/createaccount"
              className="bg-white text-blue-600 px-6 py-3 rounded-full text-base font-medium shadow hover:bg-gray-100 hover:shadow-md transition-all duration-200"
            >
              Create an Account
            </Link>
            <Link
              href="/becomeacaregiver"
              className="bg-gray-900 text-white px-6 py-3 rounded-full text-base font-medium shadow hover:bg-gray-800 hover:shadow-md transition-all duration-200"
            >
              Become a Caregiver
            </Link>
            <Link
              href="/becomeacourier"
              className="bg-yellow-500 text-white px-6 py-3 rounded-full text-base font-medium shadow hover:bg-yellow-600 hover:shadow-md transition-all duration-200"
            >
              Become a Courier
            </Link>
          </div>

        </div>
      </main>

      {/* Search Section */}
      <div className="w-[90%] mt-10 p-6 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl  ">
        <h3 className=" text-center text-2xl  text-blue-500 tracking-wide font-bold ">
          Find a Medical Courier or Caregiver
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <div className="relative w-[90%]">
            <input
              type="text"
              placeholder="Enter your zip code or location"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">
              🔍
            </span>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full font-medium shadow-md hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition-all duration-200">
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
