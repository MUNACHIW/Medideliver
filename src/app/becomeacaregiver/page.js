import Link from "next/link";
import { ShareIcon } from "@heroicons/react/24/solid";

export default function Becomeacaregiver() {
    const tweetText = encodeURIComponent("Become a medical courier today! Check out the requirements here.");
    const tweetURL = encodeURIComponent("https://medideliver.vercel.app/becomeacaregiver"); // Replace with your actual link
    const xShareURL = `https://x.com/intent/tweet?text=${tweetText}&url=${tweetURL}`;

    return (
        <>
            <div className="first-section flex justify-between items-center nav w-full shadow p-3">
                <h3 className="text-black text-4xl text-capitalize" style={{ fontFamily: "sans-serif", fontStyle: "italic" }}>
                    <Link href="/">Medideliver</Link>
                </h3>
                <Link href={xShareURL} target="_blank" rel="noopener noreferrer" className="bg-blue-600 flex items-center text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
                    Share on X
                    <ShareIcon className="h-6 w-6 text-white ml-2" />
                </Link>
            </div>

            <main className="container mx-auto max-w-4xl p-6 bg-white rounded-lg mt-6">
                <h1 className="text-3xl font-semibold text-blue-600 mb-4">General Requirements</h1>
                <p className="text-gray-700 mb-4">To become a medical caregiver, you need to meet these requirements:</p>
                <ol className="list-decimal list-inside space-y-3 text-gray-800">

                    <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-500">✔</span>
                        Certified Nursing Assistant certificate (CNA)
                    </li>

                </ol>
                <div className="flex justify-end w-full">
                    <Link href="/caregiver_application" className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
                        Apply
                    </Link>
                </div>
            </main>
        </>
    );
}