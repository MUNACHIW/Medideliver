"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import Image from "next/image"
import { ShareIcon } from "@heroicons/react/24/solid";

export default function Page() {
    const [licenseFile, setLicenseFile] = useState(null);
    const [vehicleType, setVehicleType] = useState("");
    const [email, setEmail] = useState("");
    const [hasVehicle, setHasVehicle] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setLicenseFile(event.target.files[0]);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setLicenseFile(event.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDragEnter = () => setDragActive(true);
    const handleDragLeave = () => setDragActive(false);
    function handleChange(event) {
        setEmail(event.target.value);
    }
    const tweetText = encodeURIComponent("Become a medical courier today! Check out the requirements here.");
    const tweetURL = encodeURIComponent("https://medideliver.vercel.app/becomeacourier"); // Replace with your actual link
    const xShareURL = `https://x.com/intent/tweet?text=${tweetText}&url=${tweetURL}`;


    return (
        <>
            <div className="first-section flex justify-between items-center nav w-full shadow p-3">
                <h3 className="text-black text-4xl text-capitalize" style={{ fontFamily: "sans-serif", fontStyle: "italic" }}>
                    <Link href="/" className="flex align-center">
                        <Image
                            src="/Aicon.png"  // Replace with the actual image path
                            alt="Healthcare Delivery"
                            width={30}
                            height={0}
                            className="mx-2"
                        />

                        Medideliver</Link>
                </h3>
                <Link href={xShareURL} target="_blank" rel="noopener noreferrer" className="bg-blue-600 flex items-center text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
                    Share on X
                    <ShareIcon className="h-6 w-6 text-white ml-2" />
                </Link>
            </div>
            <div className="container mx-auto max-w-4xl p-6 bg-white rounded-lg mt-6">
                <h1 className="text-3xl font-semibold text-blue-600 mb-4">
                    Apply to Become a Medical Courier
                </h1>

                {/* Drag and Drop Upload */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition ${dragActive ? "border-blue-700" : "border-blue-500"
                        }`}
                >
                    <ArrowUpTrayIcon className="h-12 w-12 text-blue-500 mb-3" />
                    <p className="text-gray-700 mb-2">
                        Drag and drop your <span>Driver&#39;s License</span> here
                    </p>

                    {/* File Upload Button */}
                    <label className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition cursor-pointer">
                        Upload License
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                        />
                    </label>

                    {licenseFile && (
                        <p className="text-green-600 font-semibold mt-2">{licenseFile.name}</p>
                    )}
                </div>
                <div className="mt-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Your Email Address for contact
                    </label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        value={email}
                        placeholder="fill your email address here"
                        name='email'
                        onChange={handleChange}
                    />


                </div>

                {/* Vehicle Information */}
                <div className="mt-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Do you have a reliable vehicle?
                    </label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        onChange={(e) => setHasVehicle(e.target.value === "yes")}
                    >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {hasVehicle && (
                    <div className="mt-4">
                        <label className="block text-gray-700 font-semibold mb-2">Vehicle Type</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="bike">Motorcycle</option>
                            <option value="car">Car</option>
                            <option value="van">Van</option>
                        </select>
                    </div>
                )}

                {/* Submit Button */}
                <div className="mt-6 flex justify-end">
                    <Link
                        href="/submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
                    >
                        Submit Application
                    </Link>
                </div>
            </div>
        </>
    );
}
