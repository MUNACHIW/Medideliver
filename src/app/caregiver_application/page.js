"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export default function CaregiverApplication() {
    const [licenseFile, setLicenseFile] = useState(null);
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

    return (
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
                    Drag and drop your <span>Certified Nursing Assistant certificate (CNA)
                    </span> here
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
    );
}