"use client";
import { useState, useCallback, useEffect } from "react";
import {
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon,
    ChatBubbleOvalLeftIcon,
    DocumentPlusIcon,
    HeartIcon,
    UserCircleIcon,
    // ChevronLeftIcon,
    // ChevronRightIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from '../hooks/useFavorites';
function ServiceCard({ tag, color, title, text, image, button, href = "#" }) {
    const badgeColors = {
        blue: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
        yellow: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200",
        green: "bg-green-100 text-green-700 ring-1 ring-green-200",
    };

    return (
        <div className="relative group bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Fixed tag positioning with higher z-index */}
            <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-semibold ${badgeColors[color]} backdrop-blur-sm shadow-md`}>
                {tag}
            </div>

            {/* Image container with controlled z-index */}
            <div className="relative overflow-hidden rounded-xl mb-4 z-10">
                <Image
                    src={image}
                    width={400}
                    height={260}
                    alt={title}
                    className="object-cover w-full h-52 transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Image overlay with lower z-index than the tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5"></div>
            </div>

            <div className="relative z-10">
                <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{text}</p>
                <Link
                    href={href}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {button}
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
export default function Career() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), []);

    const services = [
        {
            tag: "👩‍⚕️ Care",
            color: "blue",
            title: "Professional Healthcare",
            text: "Connect with certified healthcare professionals for personalized care services",
            image: "/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg",
            button: "Become A Caregiver",
            href: "/becomeacaregiver",
        },
        {
            tag: "🚚 Courier",
            color: "yellow",
            title: "Medical Delivery",
            text: "Fast, secure delivery of medical supplies and laboratory samples",
            image: "/courier.png",
            button: "Become A Courier",
            href: "/becomeacourier",
        },]
    const { favoriteCount } = useFavorites();
    return (
        <main className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
                <nav className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/overview"
                            className="flex items-center text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300"
                        >
                            <Image
                                src="/Aicon.png"
                                alt="Medideliver Logo"
                                width={40}
                                height={40}
                                className="mr-3 hover:scale-110 transition-transform duration-300"
                            />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Medideliver
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-300 group">
                                <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                            </button>
                            <button className="relative p-2 rounded-full hover:bg-blue-50 transition-colors duration-300 group">
                                <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                                    3
                                </span>
                            </button>
                            <button className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-300 group">
                                <DocumentPlusIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                            </button>
                            <Link href="/favorites" className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-300 group">
                                <HeartIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                                {favoriteCount ? (
                                    <span className="absolute top-4 left-196 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                                        {favoriteCount}
                                    </span>
                                ) : null}
                            </Link>
                        </div>

                        {/* User Profile & Upgrade */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="p-1 rounded-full hover:bg-blue-50 transition-colors duration-300">
                                <UserCircleIcon className="h-10 w-10 text-gray-600 hover:text-blue-600" />
                            </button>
                            <Link
                                href="/upgrade"
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                            >
                                Upgrade
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-full hover:bg-blue-50 transition-colors duration-300"
                            onClick={toggleMenu}
                            aria-label="Toggle navigation menu"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="h-6 w-6 text-gray-700" />
                            ) : (
                                <Bars3Icon className="h-6 w-6 text-gray-700" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
                            <div className="flex items-center justify-around mb-4">
                                <button className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-300">
                                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
                                </button>
                                <button className="relative p-2 rounded-full hover:bg-blue-50 transition-colors duration-300">
                                    <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-600" />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                        3
                                    </span>
                                </button>
                                <button className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-300">
                                    <DocumentPlusIcon className="h-6 w-6 text-gray-600" />
                                </button>
                                <Link href="/favorites" className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-300 group">
                                    <HeartIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                                    {favoriteCount ? (
                                        <span className="absolute top-4 left-196 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                                            {favoriteCount}
                                        </span>
                                    ) : null}
                                </Link>
                            </div>
                            <div className="flex items-center justify-center space-x-4">
                                <UserCircleIcon className="h-10 w-10 text-gray-600" />
                                <Link
                                    href="/upgrade"
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg font-semibold"
                                >
                                    Upgrade
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </header>
            <section className="text-center py-16 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Choose From  our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Commuinity Jobs</span>
                </h1>

                <div className="flex justify-center">
                    <div className="animate-bounce">
                        <span className="text-4xl">👇</span>
                    </div>
                </div>
            </section>
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Job Applications </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {services.map((service, index) => (
                            <div key={index}>
                                <ServiceCard {...service} />
                            </div>
                        ))}
                    </div>

                </div>
            </section>





        </main>
    )
}