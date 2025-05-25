import Link from "next/link";
import { ShareIcon } from '@heroicons/react/24/solid'


export default function Becomeacourier() {
    const tweetText = encodeURIComponent("Become a medical courier today! Check out the requirements here.");
    const tweetURL = encodeURIComponent("https://medideliver.vercel.app/becomeacourier"); // Replace with your actual link
    const xShareURL = `https://x.com/intent/tweet?text=${tweetText}&url=${tweetURL}`;

    return (
        <>
            <div className="first-section flex justify-between align-center nav w-[100%] shadow p-3 ">
                <h3 className="text-black text-4xl text-capitalize" style={{ fontFamily: "sans-serif", fontStyle: "italic" }}>
                    <Link href="/">  Medideliver</Link>
                </h3>
                <Link href={xShareURL} target="_blank" rel="noopener noreferrer" className="bg-blue-600  flex align-center text-white p-2 rounded-[30px]">
                    Share on X
                    <ShareIcon className="size-6 text-white-500" />
                </Link>

            </div>
            <main className="container mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg mt-6">
                <h1 className="text-3xl font-semibold text-blue-600 mb-4">General Requirements</h1>
                <p className="text-gray-700 mb-4">
                    To become a medical courier, you need to meet these requirements:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-800">
                    <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-500">✔</span> A high school Diploma or GED
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-500">✔</span> Driver's License
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-500">✔</span> You should have a reliable vehicle
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-500">✔</span> Relatable skills & qualities
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-500">✔</span> Relatable duties & responsibilities
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-500">✔</span> Active location
                    </li>
                </ol>
                <div className=" flex  justify-end w-full">

                    <Link href="" className="bg-blue-600 text-white p-2 rounded-[30px]">
                        Apply
                    </Link>
                </div>
            </main>

        </>
    );
}
