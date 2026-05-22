// import { verifyToken } from "@/lib/jwt";
// import { prisma } from "@/lib/prisma";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { z } from "zod";
import { error } from "console";



export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized!" },
        { status: 401 }
      )
    }

    let decoded: any
    try {
      decoded = verifyToken(token)
    } catch {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    const { id: todoId } = await params

    const findTodo = await prisma.task.findFirst({
      where: {
        id: todoId,
        userId: decoded.id,
      },
    })

    if (!findTodo) {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ todo: findTodo }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}



const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  listId: z.string().optional(),
  dueDate: z.string().optional()
  // completed: z.boolean().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Verify token
    let decoded: any;
    try {
      decoded = verifyToken(token);
    } catch {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.id;
    const { id: todoId } = await params;

    // 3. Validate request body
    const body = await req.json();
    const result = updateTodoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: result.error.format(),
        },
        { status: 400 }
      );
    }
    // , completed 
    const { title, description } = result.data;

    // 4. Check if todo exists AND belongs to user
    const existingTodo = await prisma.task.findFirst({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    if (!existingTodo) {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }

    // 5. Update only provided fields
    const updatedTodo = await prisma.task.update({
      where: {
        id: todoId,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        // ...(completed !== undefined && { completed }),
      },
    });

    // 6. Return response
    return NextResponse.json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}