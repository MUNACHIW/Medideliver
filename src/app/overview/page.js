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

// Enhanced Carousel with better accessibility and performance
// function Carousel({ title, profiles, autoPlay = true, interval = 5000 }) {
//     const [current, setCurrent] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(autoPlay);

//     const prev = useCallback(() => {
//         setCurrent((prev) => (prev - 1 + profiles.length) % profiles.length);
//     }, [profiles.length]);

//     const next = useCallback(() => {
//         setCurrent((prev) => (prev + 1) % profiles.length);
//     }, [profiles.length]);

//     const goToSlide = useCallback((index) => {
//         setCurrent(index);
//     }, []);

//     // Auto-play functionality
//     useEffect(() => {
//         if (!isPlaying) return;
//         const timer = setInterval(next, interval);
//         return () => clearInterval(timer);
//     }, [isPlaying, next, interval]);

//     // Pause on hover
//     const handleMouseEnter = () => setIsPlaying(false);
//     const handleMouseLeave = () => setIsPlaying(autoPlay);

//     return (
//         <section className="my-16 px-4" aria-label={title}>
//             <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">{title}</h2>
//             <div
//                 className="relative max-w-4xl mx-auto"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//             >
//                 <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
//                     <div
//                         className="flex transition-transform duration-700 ease-in-out"
//                         style={{ transform: `translateX(-${current * 100}%)` }}
//                         role="group"
//                         aria-label="Profile carousel"
//                     >
//                         {profiles.map((person, idx) => (
//                             <div
//                                 key={idx}
//                                 className="min-w-full p-8 flex flex-col items-center text-center"
//                                 aria-hidden={idx !== current}
//                             >
//                                 <div className="relative mb-6 group">
//                                     <Image
//                                         src={person.image}
//                                         alt={`${person.name}, ${person.role}`}
//                                         width={140}
//                                         height={140}
//                                         className="rounded-full object-cover h-32 w-32 ring-4 ring-white shadow-lg transform group-hover:scale-105 transition-transform duration-300"
//                                         priority={idx === 0}
//                                     />
//                                     <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                                 </div>
//                                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{person.name}</h3>
//                                 <p className="text-sm text-gray-600 font-medium px-4 py-2 bg-white/50 rounded-full">{person.role}</p>
//                                 {person.rating && (
//                                     <div className="flex items-center mt-3 text-yellow-500">
//                                         {[...Array(5)].map((_, i) => (
//                                             <span key={i} className={i < person.rating ? "text-yellow-400" : "text-gray-300"}>
//                                                 ⭐
//                                             </span>
//                                         ))}
//                                         <span className="ml-2 text-sm text-gray-600">({person.rating}/5)</span>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Navigation buttons */}
//                 <button
//                     onClick={prev}
//                     className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     aria-label="Previous profile"
//                 >
//                     <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
//                 </button>
//                 <button
//                     onClick={next}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     aria-label="Next profile"
//                 >
//                     <ChevronRightIcon className="h-5 w-5 text-gray-700" />
//                 </button>

//                 {/* Dots indicator */}
//                 <div className="flex justify-center mt-6 space-x-2">
//                     {profiles.map((_, idx) => (
//                         <button
//                             key={idx}
//                             onClick={() => goToSlide(idx)}
//                             className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${idx === current
//                                 ? "bg-blue-500 scale-125"
//                                 : "bg-gray-300 hover:bg-gray-400"
//                                 }`}
//                             aria-label={`Go to slide ${idx + 1}`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// Enhanced Service Card Component with fixed tag visibility
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

export default function Overview() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), []);

    // Enhanced data with ratings and better organization
    const caregivers = [
        {
            name: "Dr. Ada Nwosu",
            role: "Pediatric Nurse Specialist",
            image: "/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg",
            rating: 5,
        },
        {
            name: "Chika Okafor",
            role: "Senior Home Health Aide",
            image: "/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg",
            rating: 4,
        },
        {
            name: "Ngozi Umeh",
            role: "Geriatric Care Specialist",
            image: "/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg",
            rating: 5,
        },
    ];

    const couriers = [
        {
            name: "Emeka Obi",
            role: "Express Medical Courier",
            image: "/courier.png",
            rating: 4,
        },
        {
            name: "Tosin Adebayo",
            role: "Lab Sample Transporter",
            image: "/courier.png",
            rating: 5,
        },
        {
            name: "Fatima Bello",
            role: "Pharma Delivery Expert",
            image: "/courier.png",
            rating: 4,
        },
    ];

    const services = [
        {
            tag: "👩‍⚕️ Care",
            color: "blue",
            title: "Professional Healthcare",
            text: "Connect with certified healthcare professionals for personalized care services",
            image: "/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg",
            button: "Find Care",
            href: "/healthcare",
        },
        {
            tag: "🚚 Courier",
            color: "yellow",
            title: "Medical Delivery",
            text: "Fast, secure delivery of medical supplies and laboratory samples",
            image: "/courier.png",
            button: "Book Delivery",
            href: "/Courier",
        },
        {
            tag: "💼 Careers",
            color: "green",
            title: "Join Our Team",
            text: "Build your career in healthcare with competitive benefits and growth opportunities",
            image: "/job.png",
            button: "Apply Now",
            href: "/Jobs",
        },
    ];
    const { favoriteCount } = useFavorites();

    return (
        <main className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            {/* Enhanced Header */}
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

            {/* Hero Section */}
            <section className="text-center py-6 px-4">
                {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Healthcare Excellence</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Choose from our comprehensive healthcare services designed to meet your every need
                </p> */}
                <div className="flex justify-center">
                    <div className="animate-bounce">
                        <span className="text-4xl">👇</span>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Carousels */}
            {/* <Carousel title="🌟 Top Healthcare Professionals" profiles={caregivers} />
            <Carousel title="🚚 Trusted Medical Couriers" profiles={couriers} /> */}

            {/* Enhanced Footer */}
            <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-20 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <Link href="/overview" className="flex items-center text-2xl font-bold text-gray-800 mb-4">
                                <Image src="/Aicon.png" alt="Medideliver" width={40} height={40} className="mr-3" />
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Medideliver
                                </span>
                            </Link>
                            <p className="text-gray-600 mb-4">
                                Connecting you with trusted healthcare professionals and reliable medical delivery services.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li><Link href="/healthcare" className="hover:text-blue-600 transition-colors duration-300">Find Care</Link></li>
                                <li><Link href="/courier" className="hover:text-blue-600 transition-colors duration-300">Book Delivery</Link></li>
                                <li><Link href="/Jobs" className="hover:text-blue-600 transition-colors duration-300">Careers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li><Link href="/help" className="hover:text-blue-600 transition-colors duration-300">Help Center</Link></li>
                                <li><Link href="/contact" className="hover:text-blue-600 transition-colors duration-300">Contact Us</Link></li>
                                <li><Link href="/faq" className="hover:text-blue-600 transition-colors duration-300">FAQ</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                        <p>&copy; {new Date().getFullYear()} Medideliver. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="hover:text-blue-600 transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-blue-600 transition-colors duration-300">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="hover:text-blue-600 transition-colors duration-300">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}