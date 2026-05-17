import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";



export async function GET(req: Request) {

    try {

        const cookiestore = await cookies();
        const token = cookiestore.get("token")?.value;

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
            decoded = verifyToken(token);

        } catch (err) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        const find = await prisma.task.findMany({
            where: {
                userId: decoded.id
            }
        })


        return new NextResponse(
            JSON.stringify({ todos: find }),
            { status: 200 }
        )




    } catch (error) {

        return new NextResponse(
            JSON.stringify({ message: "An error occurred while fetching todos", error: error instanceof Error ? error.message : String(error) }),
            { status: 500 }
        )

    }



}

export async function POST(req: Request) {

    const todoSchema = z.object({
        title: z.string().min(1, "Title is req"),
        description: z.string().optional(),
        listId: z.string().optional()
    })


    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return new NextResponse(
                JSON.stringify({
                    error: "Unauthorized"
                }),
                { status: 401 }
            )
        }


        // 2. Verify token
        let decoded: any;
        try {
            decoded = verifyToken(token);
        } catch (err) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }



        const result = todoSchema.safeParse(await req.json());

        if (!result.success) {
            return new NextResponse(
                JSON.stringify({
                    error: "Validation failed",
                    issues: result.error.format()
                }),
                { status: 400 }
            )
        }

        // console.log(decoded)

        const { title, description, listId } = result.data;

        if (listId) {
            const list = await prisma.list.findFirst({
                where: {
                    id: listId,
                    userId: decoded.id
                }
            });

            if (!list) {
                return NextResponse.json(
                    { error: "Invalid list" },
                    { status: 400 }
                );
            }
        }

        const todo = await prisma.task.create({
            data: {
                title,
                description,
                userId: decoded.id,
                listId: listId || null
            }
        })

        return new NextResponse(
            JSON.stringify({ message: "Todo created successfully", todo }),
            { status: 201 }
        )




        // const verify = verifyToken(token as string) as { id: string};




    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "An error occurred during login", error: error instanceof Error ? error.message : String(error) }),
            { status: 500 }
        )
    }
}



