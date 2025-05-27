"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export default function CourierApplication() {
    const [licenseFile, setLicenseFile] = useState(null);
    const [vehicleType, setVehicleType] = useState("");
    const [hasVehicle, setHasVehicle] = useState(false);

    const handleFileDrop = (event) => {
        if (event.target.files && event.target.files[0]) {
            setLicenseFile(event.target.files[0]);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg mt-6">
            <h1 className="text-3xl font-semibold text-blue-600 mb-4">
                Apply to Become a Medical Courier
            </h1>

            {/* Drag and Drop Upload */}
            <div className="border-2 border-dashed border-blue-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-700 transition">
                <ArrowUpTrayIcon className="h-12 w-12 text-blue-500 mb-3" />
                <p className="text-gray-700 mb-2">Drag and drop your driver's license here</p>

                {/* Proper Upload Button */}
                <label className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition cursor-pointer">
                    Upload License
                    <input
                        type="file"
                        onChange={handleFileDrop}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                    />
                </label>

                {licenseFile && <p className="text-green-600 font-semibold mt-2">{licenseFile.name}</p>}
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
    );
}

