import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: Request){

    const userSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters long"),
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

        const { name, email, password } = result.data;

        const userExists = await prisma.user.findUnique({
            where: { email },
        })


        if (userExists) {
            return new NextResponse(
                JSON.stringify({ message: "User already exists" }),
                { status: 400 }
            )
        }


        const hash = await bcrypt.hash(password, 10);

        const createUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hash,
            }
        })

        return new NextResponse(
            JSON.stringify(
                {
                    message: "User created successfully",
                    user: {
                        id: createUser.id,
                        name: createUser.name,
                        email: createUser.email,
                    },
                },
            )
            , { status: 201 }
        )





    } catch (error) {

        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" , error}),
            { status: 500 }
        )
    }


}