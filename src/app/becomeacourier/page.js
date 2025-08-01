import Link from "next/link";
import Image from "next/image"
import { ShareIcon } from "@heroicons/react/24/solid";

export default function Becomeacourier() {
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
                <Link href={xShareURL} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r
                        from-blue-500 to-indigo-500 flex items-center text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
                    Share on X
                    <ShareIcon className="h-6 w-6 text-white ml-2" />
                </Link>
            </div>

            <main className="container mx-auto max-w-4xl p-6 bg-white rounded-lg mt-6">
                <h1 className="text-3xl font-semibold text-blue-600 mb-4">General Requirements</h1>
                <p className="text-gray-700 mb-4">To become a medical courier, you need to meet these requirements:</p>
                <ol className="list-decimal list-inside space-y-3 text-gray-800">

                    <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-500">✔</span> Driver&#39;s License
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-500">✔</span> You should have a reliable vehicle
                    </li>
                </ol>
                <div className="flex justify-end w-full">
                    <Link href="/courier_application" className="bg-gradient-to-r
                        from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
                        Apply
                    </Link>
                </div>
            </main>
        </>
    );
}
