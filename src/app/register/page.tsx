'use client'
import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const RegComp = () => {

    const [show, setShow] = useState(true)

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col gap-3 w-80">
                <h1 className="text-3xl font-bold">Sign up</h1>
                <div className="flex flex-col gap-2">
                    <input className="border-1 border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none  rounded-[4px]" placeholder="Enter your name" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <input className="border-1 border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none  rounded-[4px]" placeholder="Enter your email" type="email" />
                </div>
                <div className="relative">
                    <input className="border-1 w-full border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none rounded-[4px]" placeholder="*****" type={show ? "password" : "text"} />
                    <span onClick={() => setShow(!show)} className="absolute right-3 top-3 text-[#7c7c7c] text-sm cursor-pointer">
                        {show ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                </div>
                <button className="bg-[#FED44D] text-sm rounded-[4px] py-2">Sign up</button>

                <div className="flex justify-center text-xs font-semibold text-[#444444]">
                    <Link href={'/login'}><p>Already have an account? Sign in</p></Link>
                </div>
            </div>
        </div>
    )
}

export default RegComp