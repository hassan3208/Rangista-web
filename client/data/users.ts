import { API_BASE_URL } from "@/lib/api-config";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password?: string; // optional since API might not return password
};

// API base URL (update if needed)
// const API_BASE_URL = "http://localhost:8000"; // your FastAPI backend

// Fetch all users from API
export async function listAllUsers(): Promise<StoredUser[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const users = (await response.json()) as StoredUser[];
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
