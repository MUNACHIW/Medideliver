"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
    MagnifyingGlassIcon,
    MapPinIcon,
    ClockIcon,
    StarIcon,
    ChatBubbleOvalLeftIcon,
    PhoneIcon,
    ShieldCheckIcon,
    XMarkIcon,
    CheckCircleIcon,
    TruckIcon,
    UserIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Image from "next/image";

// Mock data for couriers
const couriers = [
    {
        id: 1,
        name: "Alex Johnson",
        rating: 4.9,
        deliveries: 320,
        experience: "5 years",
        location: "Manhattan, NY",
        distance: "1.5 km",
        price: 12,
        availability: "Available now",
        verified: true,
        isExpress: true,
        vehicle: "Bike",
        nextSlot: "Within 30 min",
        bio: "Fast and reliable medicine delivery specialist.",
        lat: 40.7580,
        lng: -73.9855,
        image: "/courier.png", // <-- Add image
    },
    {
        id: 2,
        name: "Sofia Lee",
        rating: 4.8,
        deliveries: 210,
        experience: "3 years",
        location: "Brooklyn, NY",
        distance: "4.2 km",
        price: 10,
        availability: "Available in 1 hour",
        verified: true,
        isExpress: false,
        vehicle: "Car",
        nextSlot: "1:00 PM",
        bio: "Experienced courier with a focus on safety and punctuality.",
        lat: 40.6782,
        lng: -73.9442,
        image: "/courier.png", // <-- Add image
    },
    {
        id: 3,
        name: "Mohammed Al-Farsi",
        rating: 4.7,
        deliveries: 150,
        experience: "2 years",
        location: "Queens, NY",
        distance: "7.8 km",
        price: 15,
        availability: "Available today",
        verified: true,
        isExpress: true,
        vehicle: "Scooter",
        nextSlot: "2:30 PM",
        bio: "Specialist in urgent and express deliveries.",
        lat: 40.7282,
        lng: -73.7949,
        image: "/courier.png", // <-- Add image
    }
];

const vehicleTypes = ["All Vehicles", "Bike", "Car", "Scooter"];
const deliveryTypes = ["All Deliveries", "Express", "Standard"];

function CourierCard({ courier, onBook }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
            <div className="relative h-40 bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                        src={courier.image}
                        alt={courier.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-full"
                    />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                    {courier.verified && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                            <ShieldCheckIcon className="h-3 w-3 mr-1" />
                            Verified
                        </div>
                    )}
                    {courier.isExpress && (
                        <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Express
                        </div>
                    )}
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{courier.name}</h3>
                        <p className="text-green-600 font-semibold text-sm">{courier.vehicle}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center text-yellow-500">
                            <StarIcon className="h-4 w-4 mr-1" />
                            <span className="font-semibold">{courier.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">({courier.deliveries} deliveries)</p>
                    </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{courier.bio}</p>
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2 text-green-500" />
                        <span>{courier.location} • {courier.distance}</span>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2 text-green-500" />
                        <span>{courier.availability}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                        <p className="text-lg font-bold text-gray-800">${courier.price}</p>
                        <p className="text-xs text-gray-500">Next: {courier.nextSlot}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-green-50 hover:bg-green-100 rounded-full transition-colors">
                            <ChatBubbleOvalLeftIcon className="h-5 w-5 text-green-600" />
                        </button>
                        <button className="p-2 bg-green-50 hover:bg-green-100 rounded-full transition-colors">
                            <PhoneIcon className="h-5 w-5 text-green-600" />
                        </button>
                        <button
                            onClick={() => onBook(courier)}
                            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-blue-700 transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BookingModal({ courier, isOpen, onClose, onConfirm }) {
    const [formData, setFormData] = useState({
        address: "",
        deliveryType: "standard",
        notes: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!formData.address) return;
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        onConfirm({ courier, ...formData });
        setIsSubmitting(false);
        onClose();
        setFormData({ address: "", deliveryType: "standard", notes: "" });
    };

    const updateFormData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 ">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-hidden">
                <div className="p-6 border-b flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">Book Courier</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <XMarkIcon className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-800">{courier?.name}</h4>
                        <p className="text-sm text-gray-600">{courier?.vehicle}</p>
                        <p className="text-sm font-semibold text-green-600 mt-1">${courier?.price}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={e => updateFormData("address", e.target.value)}
                            placeholder="Enter your address"
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Type</label>
                        <select
                            value={formData.deliveryType}
                            onChange={e => updateFormData("deliveryType", e.target.value)}
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="standard">Standard</option>
                            <option value="express">Express</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
                        <textarea
                            value={formData.notes}
                            onChange={e => updateFormData("notes", e.target.value)}
                            rows={3}
                            placeholder="Any special instructions?"
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting || !formData.address}
                            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {isSubmitting ? "Booking..." : "Confirm Booking"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper to create a custom icon with the courier's image
function createCourierIcon(imageUrl) {
    return L.icon({
        iconUrl: imageUrl,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
        className: "courier-marker-icon",
    });
}

const CourierMap = dynamic(() => import("./CourierMap"), { ssr: false });

export default function Courier() {
    const [filteredCouriers, setFilteredCouriers] = useState(couriers);
    const [filters, setFilters] = useState({
        search: "",
        vehicle: "All Vehicles",
        delivery: "All Deliveries",
        sortBy: "rating"
    });
    const [selectedCourier, setSelectedCourier] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const applyFilters = useCallback(() => {
        let filtered = couriers;
        if (filters.search) {
            filtered = filtered.filter(courier =>
                courier.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                courier.vehicle.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        if (filters.vehicle !== "All Vehicles") {
            filtered = filtered.filter(courier => courier.vehicle === filters.vehicle);
        }
        if (filters.delivery !== "All Deliveries") {
            if (filters.delivery === "Express") {
                filtered = filtered.filter(courier => courier.isExpress);
            } else {
                filtered = filtered.filter(courier => !courier.isExpress);
            }
        }
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case "rating":
                    return b.rating - a.rating;
                case "price":
                    return a.price - b.price;
                case "distance":
                    return parseFloat(a.distance) - parseFloat(b.distance);
                case "availability":
                    return a.availability.includes("now") ? -1 : 1;
                default:
                    return 0;
            }
        });
        setFilteredCouriers(filtered);
    }, [filters]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleBook = (courier) => {
        setSelectedCourier(courier);
        setShowBookingModal(true);
    };

    const handleBookingConfirm = () => {
        setBookingConfirmed(true);
        setTimeout(() => setBookingConfirmed(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Find a <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Medicine Courier</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Fast, safe, and reliable medicine delivery to your door.
                    </p>
                </div>
                {/* Express Banner */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl mb-8 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <ExclamationTriangleIcon className="h-6 w-6 animate-pulse" />
                            <div>
                                <h3 className="font-bold">Express Delivery Available</h3>
                                <p className="text-sm opacity-90">Get your medicine delivered in under 1 hour</p>
                            </div>
                        </div>
                        <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all font-semibold">
                            Call Now
                        </button>
                    </div>
                </div>
                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-2 relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search couriers..."
                                value={filters.search}
                                onChange={e => updateFilter("search", e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <select
                            value={filters.vehicle}
                            onChange={e => updateFilter("vehicle", e.target.value)}
                            className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            {vehicleTypes.map(vehicle => (
                                <option key={vehicle} value={vehicle}>{vehicle}</option>
                            ))}
                        </select>
                        <select
                            value={filters.delivery}
                            onChange={e => updateFilter("delivery", e.target.value)}
                            className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            {deliveryTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <select
                            value={filters.sortBy}
                            onChange={e => updateFilter("sortBy", e.target.value)}
                            className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="rating">Sort by Rating</option>
                            <option value="price">Sort by Price</option>
                            <option value="distance">Sort by Distance</option>
                            <option value="availability">Sort by Availability</option>
                        </select>
                    </div>
                </div>
                {/* Results */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold">{filteredCouriers.length}</span> couriers
                    </p>
                </div>
                {/* Map Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">Courier Locations</h2>
                    <div className="rounded-2xl overflow-hidden shadow-lg" style={{ height: "350px" }}>
                        <CourierMap couriers={filteredCouriers} />
                    </div>
                </div>
                {/* Couriers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCouriers.map(courier => (
                        <CourierCard
                            key={courier.id}
                            courier={courier}
                            onBook={handleBook}
                        />
                    ))}
                </div>
                {/* Empty State */}
                {filteredCouriers.length === 0 && (
                    <div className="text-center py-16">
                        <UserIcon className="h-24 w-24 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No couriers found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                        <button
                            onClick={() => setFilters({ search: "", vehicle: "All Vehicles", delivery: "All Deliveries", sortBy: "rating" })}
                            className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
                {/* Booking Modal */}
                <BookingModal
                    courier={selectedCourier}
                    isOpen={showBookingModal}
                    onClose={() => setShowBookingModal(false)}
                    onConfirm={handleBookingConfirm}
                />
                {/* Booking Confirmation */}
                {bookingConfirmed && (
                    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-xl shadow-lg z-50">
                        <div className="flex items-center space-x-2">
                            <CheckCircleIcon className="h-5 w-5" />
                            <span className="font-semibold">Booking Confirmed!</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
