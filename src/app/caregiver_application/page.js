"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "@heroicons/react/24/solid";
import Image from "next/image"

export default function Page() {
    const [licenseFile, setLicenseFile] = useState(null);
    const [hasVehicle, setHasVehicle] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [email, setEmail] = useState("");

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
    const tweetURL = encodeURIComponent("https://medideliver.vercel.app/becomeacaregiver"); // Replace with your actual link
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
                <Link href={xShareURL} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r
                        from-blue-500 to-indigo-500 flex items-center text-white py-2 px-4 rounded-full hover:bg-blue-700 transition ">
                    Share on X
                    <ShareIcon className="h-6 w-6 text-white ml-2" />
                </Link>
            </div>
            <div className="container mx-auto max-w-4xl p-6 bg-white rounded-lg mt-6">

                <h1 className="text-3xl font-semibold text-blue-600 mb-4">
                    Apply to Become a Medical Caregiver
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
                        Drag and drop your <span>Certified Nursing Assistant certificate (CNA)
                        </span> here
                    </p>

                    {/* File Upload Button */}
                    <label className="bg-gradient-to-r
                        from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition cursor-pointer">
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

                {/* Submit Button */}
                <div className="mt-6 flex justify-end">
                    <Link
                        href="/submit"
                        className="bg-gradient-to-r
                        from-blue-500 to-indigo-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
                    >
                        Submit Application
                    </Link>
                </div>
            </div>
        </>
    );
}