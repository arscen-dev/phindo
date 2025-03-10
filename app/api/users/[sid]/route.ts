import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/userService";
/**
 * GET /api/users/[sid] - Get a user by ID
 */
export async function GET({ params }: { params: { sid: string } }) {
  try {
    const { sid } = params;
    const user = await UserService.getUserById(sid);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(`Error in GET /api/users/${params.sid}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/[sid] - Update a user by ID
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { sid: string } }
) {
  try {
    const { sid } = params;
    const body = await request.json();

    const userData = {
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber,
      imageUrl: body.imageUrl,
    };

    const updatedUser = await UserService.updateUser(sid, userData);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(`Error in PUT /api/users/${params.sid}:`, error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/[sid] - Delete a user by ID
 */
export async function DELETE({ params }: { params: { sid: string } }) {
  try {
    const { sid } = params;
    const deleteData = { sid };

    const deletedUser = await UserService.deleteUser(deleteData);
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error(`Error in DELETE /api/users/${params.sid}:`, error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
