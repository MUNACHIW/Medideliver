"use client";
import { useState } from "react";
import {
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon,
    ChatBubbleOvalLeftIcon,
    DocumentPlusIcon,
    HeartIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function Carousel({ title, profiles }) {
    const [current, setCurrent] = useState(0);
    const prev = () => setCurrent((prev) => (prev - 1 + profiles.length) % profiles.length);
    const next = () => setCurrent((prev) => (prev + 1) % profiles.length);

    return (
        <section className="my-12 px-4 pb-20">
            <h2 className="text-xl font-bold text-center mb-6 text-gray-800">{title}</h2>
            <div className="relative max-w-2xl mx-auto">
                <div className="overflow-hidden rounded-xl">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {profiles.map((person, idx) => (
                            <div key={idx} className="min-w-full p-6 flex flex-col items-center text-center">
                                <Image
                                    src={person.image}
                                    alt={person.name}
                                    width={120}
                                    height={120}
                                    className="rounded-full mb-4 object-cover h-28 w-28"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
                                <p className="text-sm text-gray-500">{person.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                    ◀
                </button>
                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                    ▶
                </button>
            </div>
        </section>
    );
}

export default function Overview() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const caregivers = [
        {
            name: "Dr. Ada Nwosu",
            role: "Pediatric Nurse",
            image: "/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg",
        },
        {
            name: "Chika Okafor",
            role: "Home Health Aide",
            image: "/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg",
        },
        {
            name: "Ngozi Umeh",
            role: "Geriatric Specialist",
            image: "/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg",
        },
    ];

    const couriers = [
        {
            name: "Emeka Obi",
            role: "Express Medical Courier",
            image: "/courier.png",
        },
        {
            name: "Tosin Adebayo",
            role: "Lab Sample Transporter",
            image: "/courier.png",
        },
        {
            name: "Fatima Bello",
            role: "Pharma Delivery Expert",
            image: "/courier.png",
        },
    ];

    const cards = [
        {
            tag: "👩‍⚕️ Care",
            color: "blue",
            title: "I Need a Caregiver",
            text: "Click the button below to search for care",
            image: "/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg",
            button: "Find Care",
        },
        {
            tag: "🚚 Courier",
            color: "yellow",
            title: "I Need a Medical Courier",
            text: "To get the nearest courier, click the button",
            image: "/courier.png",
            button: "Find Courier",
        },
        {
            tag: "💼 Jobs",
            color: "green",
            title: "Get a Job With Us",
            text: "Click the button below to start working with us",
            image: "/job.png",
            button: "Get Job",
        },
    ];

    const badgeColors = {
        blue: "bg-blue-100 text-blue-600",
        yellow: "bg-yellow-100 text-yellow-600",
        green: "bg-green-100 text-green-600",
    };

    return (
        <main className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-sm rounded-md">
                <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link href="/overview" className="flex items-center text-2xl font-semibold italic text-gray-800">
                        <Image src="/Aicon.png" alt="Healthcare Delivery" width={30} height={30} className="mr-2" />
                        <span>Medideliver</span>
                    </Link>

                    <div className="hidden md:flex items-center justify-center space-x-10">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 hover:text-blue-500 transition" />
                        <div className="relative">
                            <ChatBubbleOvalLeftIcon className="h-5 w-5 text-gray-500 hover:text-blue-500 transition" />
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                                3
                            </span>
                        </div>
                        <DocumentPlusIcon className="h-5 w-5 text-gray-500 hover:text-blue-500 transition" />
                        <HeartIcon className="h-5 w-5 text-gray-500 hover:text-blue-500 transition" />
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        <UserCircleIcon className="h-9 w-9 text-gray-500" />
                        <Link
                            href=""
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                        >
                            Upgrade
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <XMarkIcon className="h-6 w-6 text-gray-700" />
                        ) : (
                            <Bars3Icon className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </nav>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden px-4 pb-4 space-y-4">
                        <div className="flex items-center justify-center space-x-10">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
                            <div className="relative">
                                <ChatBubbleOvalLeftIcon className="h-5 w-5 text-gray-600" />
                                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                                    3
                                </span>
                            </div>
                            <DocumentPlusIcon className="h-5 w-5 text-gray-600" />
                            <HeartIcon className="h-5 w-5 text-gray-600" />
                        </div>

                        <div className="flex items-center justify-center pt-2">
                            <UserCircleIcon className="h-9 w-9 text-gray-600" />
                            <Link
                                href=""
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                            >
                                Upgrade
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            <h1 className="text-center my-10 text-lg font-bold text-black font-sans">
                Getting Started. Choose An Option 👇
            </h1>

            <section className="flex flex-col lg:flex-row justify-center gap-6 items-center w-full px-2">
                {cards.map(({ tag, color, title, text, image, button }, i) => (
                    <div
                        key={i}
                        className="relative group bg-white rounded-xl shadow-md p-6 max-w-sm w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        <div
                            className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${badgeColors[color]}`}
                        >
                            {tag}
                        </div>
                        <Image src={image} width={400} height={260} alt={title} className="rounded-md object-cover w-full h-52" />
                        <h3 className="font-semibold mt-4 text-2xl text-gray-800">{title}</h3>
                        <p className="mt-2 text-gray-600">{text}</p>
                        <a
                            href="#"
                            className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                        >
                            {button}
                        </a>
                    </div>
                ))}
            </section>

            <Carousel title="🌟 Top Healthcare Givers" profiles={caregivers} />
            <Carousel title="🚚 Top Medical Couriers" profiles={couriers} />

            <footer className="bg-white border-t mt-10 py-6 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                    <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Medideliver. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <Link href="/privacy" className="hover:text-blue-500 transition-colors duration-300">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-blue-500 transition-colors duration-300">
                            Terms of Service
                        </Link>
                        <Link href="/contact" className="hover:text-blue-500 transition-colors duration-300">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
