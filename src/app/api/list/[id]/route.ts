

import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import z from 'zod'



export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const listPatch = z.object({
        Rename: z.string().min(1, "List name is required")
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

        let decoded: any

        try {
            decoded = verifyToken(token)
        } catch (error) {
            return new NextResponse(
                JSON.stringify({ error: "Invalid token" }),
                { status: 401 }
            )
        }


        const { id: listId } = await params

        const body = await req.json()
        const result = listPatch.safeParse(body)

        if (!result.success) {
            return new NextResponse(
                JSON.stringify({
                    error: result.error.format()
                }),
                { status: 400 }
            )
        }

        const { Rename } = result.data

        const existingList = await prisma.list.findFirst({
            where: {
                id: listId,
                userId: decoded.id,
            },
        });

        if (!existingList) {
            return NextResponse.json(
                { error: "list not found" },
                { status: 404 }
            );
        }

        // 5. Update only provided fields
        const updatedList = await prisma.list.update({
            where: {
                id: listId,
            },
            data: {
                ...(Rename && { name: Rename })
            },
        });




        return NextResponse.json({
            message: "List updated successfully",
            list: updatedList
        });

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "An error occurred while Renaming list", error: error instanceof Error ? error.message : String(error) }),
            { status: 500 }
        )
    }
}



export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return new NextResponse(
                JSON.stringify({
                    error: "Unauthorized!"
                })
                , { status: 401 }
            )
        }

        let decoded: any;

        try {
            decoded = verifyToken(token)
        } catch (error) {
            return new NextResponse(
                JSON.stringify({
                    error: "Invalid Token!"
                }),
                { status: 401 }
            )
        }

        const { id: listId } = await params;

        const deleteList = await prisma.list.deleteMany({
            where: {
                id: listId,
                userId: decoded.id
            }
        })
        if (deleteList.count === 0) {
            return NextResponse.json(
                { error: "Todo not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "List deleted successfully" },
            { status: 200 }
        )

    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}