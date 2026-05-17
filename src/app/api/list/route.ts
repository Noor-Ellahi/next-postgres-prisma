
import { verifyToken } from "@/lib/jwt"
import { prisma } from "@/lib/prisma"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import z from "zod"

export async function GET(req: Request) {


    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return new NextResponse(
                JSON.stringify({
                    error: "Unauthorized!"
                }),
                {status:401}
            )
        }

        let decoded: any

        try {
            decoded = verifyToken(token)
        } catch (error) {
            return new NextResponse(
                JSON.stringify({
                    error: "Inv token!"
                }),
                { status: 401 }
            )
        }


        const findAll = await prisma.list.findMany({
            where: {
                userId: decoded.id
            }
        })

        return new NextResponse(
            JSON.stringify({
                list: findAll
            }),
            { status: 200 }
        )

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "An error occurred while fetching list", error: error instanceof Error ? error.message : String(error) }),
            { status: 500 }
        )
    }
}





export async function POST(req: Request) {

    const listSchema = z.object({
        listName: z.string().min(1, "List name is required")
    })

    try {

        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return new NextResponse(
                JSON.stringify({
                    error: "Unauthorized"
                }),
                { status: 401 }

            )
        }

        let decoded: any;

        try {
            decoded = verifyToken(token)
        } catch (error) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        const body = await req.json()
        const result = listSchema.safeParse(body)

        if (!result.success) {
            return new NextResponse(
                JSON.stringify({
                    error: result.error.format()
                }),
                { status: 400 }
            )
        }

        const { listName } = result.data;


        const create = await prisma.list.create({
            data: {
                name: listName,
                userId: decoded.id
            }
        })


        return new NextResponse(
            JSON.stringify({
                message: "List created succesfully!",
                data: create
            }),
            { status: 201 }
        )



    } catch (error) {

        return new NextResponse(
            JSON.stringify({ message: "An error occurred while creating list", error: error instanceof Error ? error.message : String(error) }),
            { status: 500 }
        )
    }

}