'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";


const LoginComponent = () => {
    const router = useRouter()

    const [show, setShow] = useState(true)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>({})


    const Login = async () => {
        try {

            setLoading(true)
            setError("")

            const res = await axios.post(
                '/api/auth/login',
                {
                    email,
                    password,
                }
            )
            toast.success("Logged In successfully!")
            router.push('/')
            console.log(res)
        } catch (error: any) {
            console.log(error.response?.data?.issues)

            setError(
                error.response?.data?.issues || "Something went wrong"
            )
            toast.error(error.response?.data?.error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        // <h1>Hello</h1>

        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col gap-3 w-80">
                <h1 className="text-3xl font-bold">Sign in</h1>
                <div className="flex flex-col">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                        className="border-1 border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none  rounded-[4px]"
                        placeholder="Enter your email"
                        type="email" />
                    {
                        error &&
                        <p className="text-red-500 text-xs pl-1 pt-1">
                            {error.email?._errors[0]}
                        </p>
                    }
                </div>
                <div className="relative">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-1 w-full border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none rounded-[4px]"
                        placeholder="*****"
                        type={show ? "password" : "text"} />
                    <span onClick={() => setShow(!show)} className="absolute right-3 top-3 text-[#7c7c7c] text-sm cursor-pointer">
                        {show ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                    {
                        error &&
                        <p className="text-red-500 text-xs  pl-1 pt-1" >{error.password?._errors[0]}</p>
                    }
                </div>
                <button disabled={loading === true} onClick={() => Login()} className="bg-[#FED44D] text-sm rounded-[4px] py-2">
                    {loading ? "Loading..." : "Sign in"}
                </button>

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