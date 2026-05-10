// import { verifyToken } from "@/lib/jwt";
// import { prisma } from "@/lib/prisma";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { z } from "zod";


// export async function PUT(req: Request) {



//     try {
//         const cookieStore = await cookies();
//         const token = cookieStore.get('token')?.value;

//         if(!token){
//             return new NextResponse(
//                 JSON.stringify({
//                     error : "Unauthorized"
//                 }),
//                 { status : 401 }
//             )
//         }

//         let decoded : any;

//         try {
//             decoded = verifyToken(token);
//         } catch (error) {
//             return new NextResponse(
//                 JSON.stringify({
//                     error : "Invalid token"
//                 }),
//                 { status : 401 }
//             )
//         }

        






//     } catch (error) {
        
//     }
// }




import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
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

    const userId = decoded.userId;
    const todoId = params.id;

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

    const { title, description, completed } = result.data;

    // 4. Check if todo exists AND belongs to user
    const existingTodo = await prisma.todo.findFirst({
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
    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
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