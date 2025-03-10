import { PrismaClient } from "@prisma/client";
import { User, UserDataInput, UserDeleteInput } from "@/types/user";
import { generateSid } from "@/utils/sidUtils";

const prisma = new PrismaClient();

export class UserService {
  /**
   * Get all users
   */
  static async getAllUsers(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  /**
   * Get user by sid
   */
  static async getUserById(sid: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { sid },
      });
      return user;
    } catch (error) {
      console.error(`Error fetching user with sid ${sid}:`, error);
      throw new Error("Failed to fetch user");
    }
  }

  static async getUserByEmailOptional(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error(`Error fetching user with email ${email}:`, error);
      throw new Error("Failed to fetch user");
    }
  }

  /**
   * Create a new user
   */
  static async createUser(data: UserDataInput): Promise<User> {
    try {
      const user = await prisma.user.create({
        data: {
          sid: generateSid("USER"),
          ...data,
        },
      });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  /**
   * Update an existing user
   */
  static async updateUser(sid: string, data: UserDataInput): Promise<User> {
    try {
      const user = await prisma.user.update({
        where: { sid },
        data,
      });
      return user;
    } catch (error) {
      console.error(`Error updating user with sid ${sid}:`, error);
      throw new Error("Failed to update user");
    }
  }

  /**
   * Delete a user
   */
  static async deleteUser(data: UserDeleteInput): Promise<User> {
    try {
      const user = await prisma.user.delete({
        where: { sid: data.sid },
      });
      return user;
    } catch (error) {
      console.error(`Error deleting user with sid ${data.sid}:`, error);
      throw new Error("Failed to delete user");
    }
  }
}
