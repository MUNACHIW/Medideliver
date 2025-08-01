"use client";
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
    MagnifyingGlassIcon,
    MapPinIcon,
    ClockIcon,
    StarIcon,
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    PhoneIcon,
    ShieldCheckIcon,
    XMarkIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    UserIcon,
    FunnelIcon
} from '@heroicons/react/24/solid';
import { useFavorites } from '../hooks/useFavorites'; // Import the custom hook

// Mock data with foreign names and USD currency
const providers = [
    {
        id: 1,
        name: "Dr. Maria Rodriguez",
        specialty: "Pediatric Nursing",
        rating: 4.9,
        reviews: 127,
        experience: "8 years",
        location: "Manhattan, NY",
        distance: "2.1 km",
        price: 150,
        availability: "Available today",
        verified: true,
        isEmergency: true,
        services: ["Home Care", "Child Health", "Immunization"],
        nextSlot: "2:00 PM",
        bio: "Experienced pediatric nurse with expertise in child healthcare."
    },
    {
        id: 2,
        name: "Dr. Chen Wei",
        specialty: "Home Health Care",
        rating: 4.8,
        reviews: 89,
        experience: "12 years",
        location: "Brooklyn, NY",
        distance: "5.3 km",
        price: 120,
        availability: "Available tomorrow",
        verified: true,
        isEmergency: false,
        services: ["Elderly Care", "Wound Care", "Physiotherapy"],
        nextSlot: "10:00 AM",
        bio: "Specialized in geriatric care and home health services."
    },
    {
        id: 3,
        name: "Dr. Fatima Al-Zahra",
        specialty: "Mental Health",
        rating: 4.9,
        reviews: 156,
        experience: "15 years",
        location: "Queens, NY",
        distance: "12.8 km",
        price: 200,
        availability: "Available in 2 days",
        verified: true,
        isEmergency: false,
        services: ["Counseling", "Therapy", "Mental Health Assessment"],
        nextSlot: "3:00 PM",
        bio: "Licensed mental health professional specializing in anxiety and depression."
    },
    {
        id: 4,
        name: "Dr. Rajesh Patel",
        specialty: "General Practice",
        rating: 4.7,
        reviews: 203,
        experience: "10 years",
        location: "Bronx, NY",
        distance: "8.7 km",
        price: 180,
        availability: "Available today",
        verified: true,
        isEmergency: true,
        services: ["General Checkup", "Diagnosis", "Preventive Care"],
        nextSlot: "4:30 PM",
        bio: "General practitioner with comprehensive medical training."
    },
    {
        id: 5,
        name: "Dr. Olga Petrov",
        specialty: "Cardiology",
        rating: 4.8,
        reviews: 98,
        experience: "14 years",
        location: "Staten Island, NY",
        distance: "15.2 km",
        price: 250,
        availability: "Available tomorrow",
        verified: true,
        isEmergency: false,
        services: ["Heart Health", "ECG", "Cardiac Screening"],
        nextSlot: "11:00 AM",
        bio: "Board-certified cardiologist with expertise in preventive cardiology."
    },
    {
        id: 6,
        name: "Dr. Jean-Pierre Dubois",
        specialty: "Dermatology",
        rating: 4.6,
        reviews: 74,
        experience: "9 years",
        location: "Manhattan, NY",
        distance: "3.4 km",
        price: 175,
        availability: "Available in 3 days",
        verified: true,
        isEmergency: false,
        services: ["Skin Care", "Dermatology Consultation", "Cosmetic Procedures"],
        nextSlot: "1:00 PM",
        bio: "Dermatologist specializing in both medical and cosmetic dermatology."
    }
];

const specialties = ["All Specialties", "General Practice", "Pediatric Nursing", "Home Health Care", "Mental Health", "Cardiology", "Dermatology"];
const serviceTypes = ["All Services", "Home Visit", "Clinic Visit", "Telemedicine", "Emergency Care"];

function ProviderCard({ provider, onBook, onFavorite, isFavorite }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
            <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <UserIcon className="h-16 w-16 text-gray-400" />
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                    {provider.verified && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                            <ShieldCheckIcon className="h-3 w-3 mr-1" />
                            Verified
                        </div>
                    )}
                    {provider.isEmergency && (
                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Emergency
                        </div>
                    )}
                </div>

                <button
                    onClick={() => onFavorite(provider.id)}
                    className="absolute top-4 left-4 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-110"
                >
                    <HeartIcon
                        className={`h-5 w-5 transition-colors ${isFavorite
                                ? 'text-red-500 animate-pulse'
                                : 'text-gray-400 hover:text-red-400'
                            }`}
                    />
                </button>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{provider.name}</h3>
                        <p className="text-blue-600 font-semibold text-sm">{provider.specialty}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center text-yellow-500">
                            <StarIcon className="h-4 w-4 mr-1" />
                            <span className="font-semibold">{provider.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">({provider.reviews} reviews)</p>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{provider.bio}</p>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{provider.location} • {provider.distance}</span>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{provider.availability}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                    {provider.services.slice(0, 2).map((service, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                            {service}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                        <p className="text-lg font-bold text-gray-800">${provider.price}</p>
                        <p className="text-xs text-gray-500">Next: {provider.nextSlot}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors">
                            <ChatBubbleOvalLeftIcon className="h-5 w-5 text-blue-600" />
                        </button>
                        <button className="p-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors">
                            <PhoneIcon className="h-5 w-5 text-blue-600" />
                        </button>
                        <button
                            onClick={() => onBook(provider)}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BookingModal({ provider, isOpen, onClose, onConfirm }) {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        serviceType: 'home',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

    const handleSubmit = async () => {
        if (!formData.date || !formData.time) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        onConfirm({ provider, ...formData });
        setIsSubmitting(false);
        onClose();
        setFormData({ date: '', time: '', serviceType: 'home', notes: '' });
    };

    const updateFormData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">Book Appointment</h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                            <XMarkIcon className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-800">{provider?.name}</h4>
                        <p className="text-sm text-gray-600">{provider?.specialty}</p>
                        <p className="text-sm font-semibold text-green-600 mt-1">${provider?.price}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                        <select
                            value={formData.serviceType}
                            onChange={(e) => updateFormData('serviceType', e.target.value)}
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="home">Home Visit</option>
                            <option value="clinic">Clinic Visit</option>
                            <option value="telemedicine">Telemedicine</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => updateFormData('date', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                        <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => updateFormData('time', time)}
                                    className={`p-3 rounded-xl border transition-all ${formData.time === time
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-gray-50 hover:bg-blue-50'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => updateFormData('notes', e.target.value)}
                            rows={3}
                            placeholder="Describe your symptoms or concerns..."
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
                            disabled={isSubmitting || !formData.date || !formData.time}
                            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Healthcare() {
    const [filteredProviders, setFilteredProviders] = useState(providers);
    const [filters, setFilters] = useState({
        search: '',
        specialty: 'All Specialties',
        service: 'All Services',
        sortBy: 'rating'
    });
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    // Use the custom favorites hook
    const { toggleFavorite, isFavorite, favoriteCount, isLoaded } = useFavorites();

    const applyFilters = useCallback(() => {
        let filtered = providers;

        // Search filter
        if (filters.search) {
            filtered = filtered.filter(provider =>
                provider.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                provider.specialty.toLowerCase().includes(filters.search.toLowerCase()) ||
                provider.services.some(service => service.toLowerCase().includes(filters.search.toLowerCase()))
            );
        }

        // Specialty filter
        if (filters.specialty !== 'All Specialties') {
            filtered = filtered.filter(provider => provider.specialty === filters.specialty);
        }

        // Service filter
        if (filters.service !== 'All Services') {
            if (filters.service === 'Emergency Care') {
                filtered = filtered.filter(provider => provider.isEmergency);
            } else {
                filtered = filtered.filter(provider =>
                    provider.services.some(service =>
                        service.toLowerCase().includes(filters.service.toLowerCase())
                    )
                );
            }
        }

        // Sort
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'price':
                    return a.price - b.price;
                case 'distance':
                    return parseFloat(a.distance) - parseFloat(b.distance);
                case 'availability':
                    return a.availability.includes('today') ? -1 : 1;
                default:
                    return 0;
            }
        });

        setFilteredProviders(filtered);
    }, [filters]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleBook = (provider) => {
        setSelectedProvider(provider);
        setShowBookingModal(true);
    };

    const handleBookingConfirm = () => {
        setBookingConfirmed(true);
        setTimeout(() => setBookingConfirmed(false), 3000);
    };

    // Don't render until favorites are loaded to prevent flash
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <div></div>
                        <Link href="/favorites">
                            <button className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                                <HeartIcon className="h-5 w-5" />
                                <span>Favorites ({favoriteCount})</span>
                            </button>
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Find Your Perfect <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Healthcare Provider</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Connect with verified healthcare professionals in your area. Quality care is just a click away.
                    </p>
                </div>

                {/* Emergency Banner */}
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl mb-8 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <ExclamationTriangleIcon className="h-6 w-6 animate-pulse" />
                            <div>
                                <h3 className="font-bold">Emergency Care Available</h3>
                                <p className="text-sm opacity-90">24/7 emergency healthcare services</p>
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
                                placeholder="Search providers..."
                                value={filters.search}
                                onChange={(e) => updateFilter('search', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <select
                            value={filters.specialty}
                            onChange={(e) => updateFilter('specialty', e.target.value)}
                            className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {specialties.map(specialty => (
                                <option key={specialty} value={specialty}>{specialty}</option>
                            ))}
                        </select>

                        <select
                            value={filters.service}
                            onChange={(e) => updateFilter('service', e.target.value)}
                            className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {serviceTypes.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>

                        <select
                            value={filters.sortBy}
                            onChange={(e) => updateFilter('sortBy', e.target.value)}
                            className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        Showing <span className="font-semibold">{filteredProviders.length}</span> healthcare providers
                    </p>
                </div>

                {/* Providers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProviders.map((provider) => (
                        <ProviderCard
                            key={provider.id}
                            provider={provider}
                            onBook={handleBook}
                            onFavorite={toggleFavorite}
                            isFavorite={isFavorite(provider.id)}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProviders.length === 0 && (
                    <div className="text-center py-16">
                        <UserIcon className="h-24 w-24 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No providers found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                        <button
                            onClick={() => setFilters({ search: '', specialty: 'All Specialties', service: 'All Services', sortBy: 'rating' })}
                            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Booking Modal */}
                <BookingModal
                    provider={selectedProvider}
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