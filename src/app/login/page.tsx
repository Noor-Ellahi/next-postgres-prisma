'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const LoginComponent = () => {
    const router = useRouter()

    const [show, setShow] = useState(true)

    return (
        // <h1>Hello</h1>

        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col gap-3 w-80">
                <h1 className="text-3xl font-bold">Sign in</h1>
                <div className="flex flex-col gap-2">
                    <input className="border-1 border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none  rounded-[4px]" placeholder="Enter your email" type="email" />
                </div>
                <div className="relative">
                    <input className="border-1 w-full border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none rounded-[4px]" placeholder="*****" type={show ? "password" : "text"} />
                    <span onClick={() => setShow(!show)} className="absolute right-3 top-3 text-[#7c7c7c] text-sm cursor-pointer">
                        {show ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                </div>
                <button className="bg-[#FED44D] text-sm rounded-[4px] py-2">Sign in</button>

                <div className="flex items-center my-2 w-full">
                    <div className="flex-1 h-px bg-[#E9E9E9]"></div>
                    <span className="px-4 text-gray-500 text-sm whitespace-nowrap">or</span>
                    <div className="flex-1 h-px bg-[#E9E9E9]"></div>
                </div>
                <div className="flex justify-between ">
                    <button className="rounded-[4px] py-2 text-xs bg-[#EBEBEB] px-10">Fackbook</button>
                    <button className="rounded-[4px] py-2 text-xs bg-[#EBEBEB] px-12">Google</button>
                </div>
                <div className="flex justify-center text-xs font-semibold text-[#444444]">
                    <p>Dont have an account? <span className="cursor-pointer" onClick={() => router.push('/register')}>Sign up</span></p>
                </div>
            </div>
        </div>
    )
}


export default LoginComponent