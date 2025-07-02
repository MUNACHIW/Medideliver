"use client";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
// import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
// import { DocumentPlusIcon } from "@heroicons/react/24/solid";
// import { Heart } from "@heroicons/react/24/solid";
// import { Square2Stack } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link"

export default function Overview() {
    return (
        <main className="bg-gray-100 min-h-screen py-10 px-4">
            <nav className="flex justify-between items-center w-full shadow-sm p-4 bg-white rounded-md">
                <Link href="/overview" className="flex items-center text-2xl font-semibold italic text-gray-800">
                    <Image src="/Aicon.png" alt="Healthcare Delivery" width={30} height={30} className="mr-2" />
                    <span>Medideliver</span>
                </Link>
            </nav>

            <h1 className="text-center my-10 text-3xl font-bold text-blue-600 font-sans">
                Getting Started. Choose An Option 👇
            </h1>

            <section className="flex flex-col lg:flex-row justify-center items-stretch gap-6 px-2">
                {/** Card 1 */}
                <div className="relative group bg-white rounded-xl shadow-md p-6 max-w-sm w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                        👩‍⚕️ Care
                    </div>
                    <Image
                        src="/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg"
                        width={400}
                        height={260}
                        alt="Caregiver"
                        className="rounded-md object-cover w-full h-52"
                    />
                    <h3 className="font-semibold mt-4 text-2xl text-gray-800">I Need a Caregiver</h3>
                    <p className="mt-2 text-gray-600">Click the button below to search for care</p>
                    <a
                        href="#"
                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Find Care
                    </a>
                </div>

                {/** Card 2 */}
                <div className="relative group bg-white rounded-xl shadow-md p-6 max-w-sm w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-semibold">
                        🚚 Courier
                    </div>
                    <Image
                        src="/courier.png"
                        width={400}
                        height={260}
                        alt="Medical Courier"
                        className="rounded-md object-cover w-full h-52"
                    />
                    <h3 className="font-semibold mt-4 text-2xl text-gray-800">I Need a Medical Courier</h3>
                    <p className="mt-2 text-gray-600">To get the nearest courier, click the button</p>
                    <a
                        href="#"
                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Find Courier
                    </a>
                </div>

                {/** Card 3 */}
                <div className="relative group bg-white rounded-xl shadow-md p-6 max-w-sm w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        💼 Jobs
                    </div>
                    <Image
                        src="/job.png"
                        width={400}
                        height={260}
                        alt="Get a Job"
                        className="rounded-md object-cover w-full h-52"
                    />
                    <h3 className="font-semibold mt-4 text-2xl text-gray-800">Get a Job With Us</h3>
                    <p className="mt-2 text-gray-600">Click the button below to start working with us</p>
                    <a
                        href="#"
                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Get Job
                    </a>
                </div>
            </section>
        </main>

    )
}