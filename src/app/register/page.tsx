'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const RegComp = () => {

    const router = useRouter()

    const [show, setShow] = useState(true)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>({})

    const Register = async () => {

        try {

            setLoading(true)
            setError("")

            const res = await axios.post(
                '/api/auth/register',
                {
                    name,
                    email,
                    password,
                }
            )
            toast.success("Account created")
            router.push('/login')
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
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col gap-3 w-80">
                <h1 className="text-3xl font-bold">Sign up</h1>
                <div className="flex flex-col ">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-1 border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none  rounded-[4px]"
                        placeholder="Enter your name"
                        type="text" />
                    {
                        error &&
                        <p className="text-red-500 text-xs pl-1 pt-1">{error.name?._errors[0]}</p>
                    }
                </div>

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




                <button disabled={loading === true} onClick={() => Register()} className="bg-[#FED44D] text-sm rounded-[4px] py-2">
                    {loading ? "Loading..." : "Sign up"}
                </button>

                <div className="flex justify-center text-xs font-semibold text-[#444444]">
                    <p>Already have an account? <span className="cursor-pointer" onClick={() => router.push('/login')}>Sign in</span></p>
                </div>
            </div>
        </div>
    )
}

export default RegComp




// 'use client'

// import axios from "axios";
// import Link from "next/link";
// import { useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// const RegComp = () => {

//     const [show, setShow] = useState(true)

//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState("")

//     const Register = async () => {

//         try {

//             setLoading(true)
//             setError("")

//             const res = await axios.post('/api/register', {
//                 name,
//                 email,
//                 password
//             })

//             console.log(res.data)

//         } catch (err: any) {

//             setError(
//                 err.response?.data?.error || "Something went wrong"
//             )

//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="h-screen flex justify-center items-center">
//             <div className="flex flex-col gap-3 w-80">

//                 <h1 className="text-3xl font-bold">
//                     Sign up
//                 </h1>

//                 <div className="flex flex-col gap-2">
//                     <input
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="border border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none rounded-[4px]"
//                         placeholder="Enter your name"
//                         type="text"
//                     />
//                 </div>

//                 <div className="flex flex-col gap-2">
//                     <input
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="border border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none rounded-[4px]"
//                         placeholder="Enter your email"
//                         type="email"
//                     />
//                 </div>

//                 <div className="relative">
//                     <input
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="border w-full border-[#E9E9E9] text-[12px] py-2 pl-2 outline-none rounded-[4px]"
//                         placeholder="*****"
//                         type={show ? "password" : "text"}
//                     />

//                     <span
//                         onClick={() => setShow(!show)}
//                         className="absolute right-3 top-3 text-[#7c7c7c] text-sm cursor-pointer"
//                     >
//                         {show ? <FaRegEye /> : <FaRegEyeSlash />}
//                     </span>
//                 </div>

//                 {
//                     error &&
//                     <p className="text-red-500 text-xs">
//                         {error}
//                     </p>
//                 }

//                 <button
//                     onClick={Register}
//                     disabled={loading}
//                     className="bg-[#FED44D] text-sm rounded-[4px] py-2"
//                 >
//                     {loading ? "Loading..." : "Sign up"}
//                 </button>

//                 <div className="flex justify-center text-xs font-semibold text-[#444444]">
//                     <Link href={'/login'}>
//                         <p>Already have an account? Sign in</p>
//                     </Link>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default RegComp