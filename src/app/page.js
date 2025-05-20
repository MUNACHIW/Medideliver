import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="  flex flex-col justify-center items-center ">
      <main className=" main1 w-[100%] cta  backdrop">
        <nav className=" p-4">
          <h1 className=" text-center text-white text-4xl">Medideliver</h1>
        </nav>
        <p className="text-center my-4 text-white">Connecting You to Healthcare Providers & relatable  medical couriers</p>
        <div className="flex justify-center align-items-center py-4">
          <Link className="bg-blue-600 text-white p-3  rounded" href="/becomeacaregiver">Become A CareGiver</Link>
        </div>
        <div className="flex justify-center">
          <Link href="/createaccount" className="bg-white text-black p-3 m-2  rounded">Create An Account</Link> <Link href="/becomeacourier" className="bg-white text-black p-3 m-2  rounded">Become A courier</Link>
        </div>
      </main>
      <div className="layout-holder grid grid-cols-2 ">
        <form className=" medical m-4  p-2 my-2 rounded w-[80%] " >
          <h1 className=" my-2 font-bold">Search For A Medical Courier Or A CareGiver</h1>
          <div className="flex justify-left align-center">
            <input className="w-90 border-1 outline-0 bg-gray-50 p-2 m-1 rounded-3xl" placeholder=" 🔍Fill Your zip code or Location"></input>
            <button className="bg-blue-500 text-white w-[100px] p-2 rounded-3xl">Search</button>
          </div>


        </form>
        <div className="whyus">
          <strong>Medideliver</strong> is a cutting-edge SaaS platform designed to seamlessly connect patients, healthcare providers, and specialized medical couriers. Whether delivering critical prescriptions, lab samples, or essential healthcare supplies, Medideliver ensures fast, secure, and reliable transportation.
        </div>
        <div className="whyus">
          <h3 className="font-bold text-2xl my-2">Why Medideliver?</h3>
          <strong>Effortless Access</strong> – Patients and healthcare providers can schedule deliveries with ease.<br></br>
          <strong>Trusted Medical Couriers</strong> – Verified professionals ensure safe handling of sensitive medical items.<br></br>
          <strong>Real-Time Tracking</strong>– Monitor deliveries every step of the way.<br></br>
          <strong>Compliance & Security</strong> – Adheres to healthcare standards for secure transport.<br></br>
          <strong>Integrated Solutions</strong> – Works with hospitals, pharmacies, and clinics for streamlined logistics.
          <h3>Bridging the Gap in Medical Logistics</h3>
          Medideliver is more than just a delivery service—it’s a lifeline for efficient healthcare accessibility. By eliminating delays and improving the supply chain, the platform helps patients receive essential medical items when they need them most.
        </div>
      </div>
    </section>





  );
}
