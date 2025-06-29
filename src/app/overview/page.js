"use client";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
// import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
// import { DocumentPlusIcon } from "@heroicons/react/24/solid";
// import { Heart } from "@heroicons/react/24/solid";
// import { Square2Stack } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link"

export default function Overview() {
    return (
        <main className="overview-layout bg-gray-200">
            <nav
                className="first-section flex justify-between items-center nav w-full shadow p-3 bg-white"
            >
                <Link href="/overview" className="flex items-center text-black text-4xl text-capitalize  italic ">
                    <Image
                        src="/Aicon.png"  // Replace with the actual image path
                        alt="Healthcare Delivery"
                        width={30}
                        height={0}
                        className="mx-2"
                    />

                    Medideliver</Link>
            </nav>
            <h1 className=" started text-center my-10  text-3xl font-sans font-bold text-blue-500">Getting Started. Choose An Option 👇</h1>
            <section className=" responsive flex justify-center items-center">
                <div className=" w-100 bg-white m-2 rounded p-[20px] ">
                    <Image
                        src="/realistic-image-digital-healthcare-doctor-nurse-woman-standing-generative-ai_653669-4477.jpg"
                        width={200}
                        height={0}
                        alt="care giver"
                        className="w-100 rounded"
                    />
                    <h3 className="font-bold m-2 text-2xl font-sans " >I need A care giver</h3>
                    <p className="m-2 text-lg">Click the button below to search for care</p>
                    <a href="" className="bg-blue-500 text-white m-2 rounded p-2">Find Care</a>
                </div>
                <div className=" w-100 bg-white m-2 rounded p-[20px] ">
                    <Image
                        src="/courier.png"
                        width={200}
                        height={0}
                        alt="care giver"
                        className="w-100 h-60 rounded"
                    />
                    <h3 className="font-bold m-2 text-2xl font-sans " >I need a medical Courier</h3>
                    <p className="m-2 text-lg">To get nearest courier click the button</p>
                    <a href="" className="bg-blue-500 text-white m-2 rounded p-2">Find Courier</a>
                </div>
            </section>
            <section className=" flex justify-center items-center">
                <div className=" w-100 bg-white m-2 rounded  p-[20px]">
                    <Image
                        src="/job.png"
                        width={200}
                        height={0}
                        alt="care giver"
                        className="w-100 h-60 rounded   "
                    />
                    <h3 className="font-bold m-2 text-2xl font-sans " >Get A job with us</h3>
                    <p className="m-2 text-lg">click the button below to work</p>
                    <a href="" className="bg-blue-500 text-white m-2 rounded p-2">Get Job</a>
                </div>
            </section>
        </main>
    )
}