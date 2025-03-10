import { NextRequest, NextResponse } from "next/server";
import * as userService from "@/services/userService";
import { UserDataInput, UserDeleteInput } from "@/types/user";

/**
 * GET /api/users - Get all users
 */
export async function GET() {
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users - Create a new user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userData: UserDataInput = {
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber,
      imageUrl: body.imageUrl,
    };

    const newUser = await userService.createUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users - Update a user
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.sid) {
      return NextResponse.json(
        { error: "User ID (sid) is required" },
        { status: 400 }
      );
    }

    const userData: UserDataInput = {
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber,
      imageUrl: body.imageUrl,
    };

    const updatedUser = await userService.updateUser(body.sid, userData);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api/users:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users - Delete a user
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sid = searchParams.get("sid");

    if (!sid) {
      return NextResponse.json(
        { error: "User ID (sid) is required" },
        { status: 400 }
      );
    }

    const deleteData: UserDeleteInput = { sid };
    const deletedUser = await userService.deleteUser(deleteData);
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/users:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
