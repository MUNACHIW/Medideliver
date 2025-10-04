"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeftIcon,
    UserCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CalendarIcon,
    PencilIcon,
    HeartIcon,
    BellIcon,
    ShieldCheckIcon,
    CreditCardIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [profileData, setProfileData] = useState({
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+134994004040",
        location: "Austin, Texas",
        joinDate: "January 2024",
        bio: "Looking for quality medical services and reliable delivery options.",
        balance: "$450.00"
    });

    const stats = [
        { label: "Bookings", value: "12", icon: CalendarIcon, color: "blue" },
        { label: "Favorites", value: "8", icon: HeartIcon, color: "red" },
        { label: "Account Balance", value: profileData.balance, icon: CreditCardIcon, color: "green" },
    ];

    const handleInputChange = (field, value) => {
        setProfileData({ ...profileData, [field]: value });
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <Link href="/overview">
                        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <ArrowLeftIcon className="h-5 w-5" />
                            <span>Back to Overview</span>
                        </button>
                    </Link>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Profile
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <div className="text-center">
                                <div className="relative inline-block mb-4">
                                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-100 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                        <UserCircleIcon className="w-28 h-28 text-blue-600" />
                                    </div>
                                    <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors shadow-lg">
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                    {profileData.name}
                                </h2>

                                <div className="flex justify-center mb-6">
                                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                                        Verified Account
                                    </span>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 gap-4 mb-6">
                                {stats.map((stat, idx) => {
                                    const Icon = stat.icon;
                                    const colorClasses = {
                                        blue: "bg-blue-50 text-blue-600",
                                        red: "bg-red-50 text-red-600",
                                        green: "bg-green-50 text-green-600",
                                    };
                                    return (
                                        <div key={idx} className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4">
                                            <div className={`w-12 h-12 ${colorClasses[stat.color]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                                <p className="text-xs text-gray-500">{stat.label}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Tabs Content */}
                    <div className="lg:col-span-2">
                        {/* Tab Navigation */}
                        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
                            <div className="flex border-b border-gray-200">
                                {["overview", "wallet", "settings"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 ${activeTab === tab
                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                                            : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center"
                                        >
                                            <PencilIcon className="h-4 w-4 mr-1" />
                                            {isEditing ? "Save" : "Edit"}
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <EnvelopeIcon className="h-5 w-5 text-gray-400 mt-1" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 mb-1">Email</p>
                                                {isEditing ? (
                                                    <input
                                                        type="email"
                                                        value={profileData.email}
                                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                ) : (
                                                    <p className="text-gray-800 font-medium">{profileData.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <PhoneIcon className="h-5 w-5 text-gray-400 mt-1" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 mb-1">Phone</p>
                                                {isEditing ? (
                                                    <input
                                                        type="tel"
                                                        value={profileData.phone}
                                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                ) : (
                                                    <p className="text-gray-800 font-medium">{profileData.phone}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <MapPinIcon className="h-5 w-5 text-gray-400 mt-1" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 mb-1">Location</p>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={profileData.location}
                                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                ) : (
                                                    <p className="text-gray-800 font-medium">{profileData.location}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <CalendarIcon className="h-5 w-5 text-gray-400 mt-1" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 mb-1">Member Since</p>
                                                <p className="text-gray-800 font-medium">{profileData.joinDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Wallet Tab */}
                        {activeTab === "wallet" && (
                            <div className="space-y-6">
                                {/* Balance Card */}
                                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-blue-100 text-sm mb-2">Available Balance</p>
                                            <h2 className="text-4xl font-bold">{profileData.balance}</h2>
                                        </div>
                                        <CreditCardIcon className="h-12 w-12 text-blue-200" />
                                    </div>
                                    <div className="flex space-x-3">
                                        <button className="flex-1 bg-white text-blue-600 px-4 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                                            + Add Funds
                                        </button>
                                        <button className="flex-1 bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                                            Withdraw
                                        </button>
                                    </div>
                                </div>

                                {/* Stripe Payment Integration */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-800">Payment Methods</h3>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 mb-1">Powered by</p>
                                            <svg className="h-6" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.93 0 1.85 6.29.97 6.29 5.88z" fill="#635BFF" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-blue-200">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                                                    <CreditCardIcon className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Visa •••• 4242</p>
                                                    <p className="text-xs text-gray-500">Expires 12/26</p>
                                                </div>
                                            </div>
                                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                                                Default
                                            </span>
                                        </div>
                                    </div>

                                    <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
                                        <span className="text-2xl">+</span>
                                        <span className="font-semibold">Add Payment Method</span>
                                    </button>
                                </div>

                                {/* Transaction History */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Transactions</h3>
                                    <div className="space-y-3">
                                        {[
                                            { type: "credit", desc: "Wallet Top-up", amount: "+$200.00", date: "Oct 2, 2025" },
                                            { type: "debit", desc: "Healthcare Service", amount: "-$50.00", date: "Oct 1, 2025" },
                                            { type: "debit", desc: "Medical Delivery", amount: "-$25.00", date: "Sep 28, 2025" },
                                        ].map((transaction, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                                                        }`}>
                                                        {transaction.type === "credit" ? (
                                                            <span className="text-green-600 font-bold text-xl">↑</span>
                                                        ) : (
                                                            <span className="text-red-600 font-bold text-xl">↓</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{transaction.desc}</p>
                                                        <p className="text-xs text-gray-500">{transaction.date}</p>
                                                    </div>
                                                </div>
                                                <p className={`font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"
                                                    }`}>
                                                    {transaction.amount}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === "settings" && (
                            <div className="space-y-6">
                                {/* Notifications */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <BellIcon className="h-6 w-6 text-blue-600" />
                                        <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {["Email notifications"].map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-700">{item}</span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                                        <h3 className="text-xl font-bold text-gray-800">Security</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <p className="font-semibold text-gray-800">Change Password</p>
                                            <p className="text-sm text-gray-500">Update your password regularly</p>
                                        </button>
                                        <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <p className="font-semibold text-gray-800">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Account Preferences */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
                                        <h3 className="text-xl font-bold text-gray-800">Account Preferences</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <p className="font-semibold text-gray-800">Language & Region</p>
                                            <p className="text-sm text-gray-500">English (United States)</p>
                                        </button>
                                        {/* <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <p className="font-semibold text-gray-800">Privacy Settings</p>
                                            <p className="text-sm text-gray-500">Manage your data preferences</p>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}