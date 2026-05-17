

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";




export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {

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

        let decoded: any;

        try {
            decoded = verifyToken(token);
        } catch (error) {
            return new NextResponse(
                JSON.stringify({
                    error: "Invalid token"
                }),
                { status: 401 }
            )
        }

        const userId = decoded.id;
        const { id: todoID } = await params;

        const deletedTodo = await prisma.task.deleteMany({
            where: {
                id: todoID,
                userId: userId
            }
        });

        if (deletedTodo.count === 0) {
            return NextResponse.json(
                { error: "Todo not found or unauthorized" },
                { status: 404 }
            );
        }


        return new NextResponse(
            JSON.stringify({
                message: "Todo deleted successfully"
            }),
            { status: 200 }
        )



    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                error: "An error occurred while deleting the todo",
                details: error instanceof Error ? error.message : String(error)
            }),
            { status: 500 }
        )
    }
}