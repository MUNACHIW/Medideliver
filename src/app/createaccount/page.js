import Link from "next/link"
import Image from "next/image"

export default function Createaccount() {

    return (
        <section className="form-section">
            <div className="form">
                <div className="sec1">
                    <h1>The Medideliver</h1>
                    <p>
                        Connecting You to Caregivers & relatable  medical couriers
                    </p>
                </div>
                <div className="sec2">
                    <form>
                        <input className="input2" type="text" placeholder=" Your name" />
                        <input className="input1" type="text" id="input" placeholder="Email address or Phone number" />
                        <input className="input2" id="password" type="password" placeholder="Password" />
                        <button type="submit" className="login"> Create Account</button>

                        <hr />
                        <button className="Googleauth">

                            <Image src="/devicon_google.png" width={20} height={20} alt="google" priority />
                            createaccount with google

                        </button>
                        <p style={{ textAlign: "center" }}><span>Become  A Medical Courier</span>
                            <Link href="/becomeacaregiver"> click the link</Link></p>
                    </form>
                    <p><span>Become  A Caregiver</span>
                        <Link href="/becomeacaregiver"> click the link</Link></p>
                </div>
            </div>
        </section>
    )
}