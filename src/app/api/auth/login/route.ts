
import z from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
import { signToken } from "@/lib/jwt";



export async function POST(req: Request) {


    const userSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long")
    })

    try {
        const body = await req.json();

        const result = userSchema.safeParse(body);


        if (!result.success) {
            return new NextResponse(
                JSON.stringify(
                    {
                        error: "Validation failed",
                        issues: result.error.format()
                        ,
                    },
                )
                , { status: 400 }
            )
        }

        const { email, password } = result.data;

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid email or password" }),
                { status: 404 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid email or password" }),
                { status: 401 }
            )
        }

        const token = signToken({ id: user.id, email: user.email })



        const response = new NextResponse(
            JSON.stringify({
                message: "Login successful"
                ,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            }),
            { status: 200 }
        )

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        })


        return response;

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "An error occurred during login", error: error instanceof Error ? error.message : String(error) }),
            { status: 500 }
        )
    }
}