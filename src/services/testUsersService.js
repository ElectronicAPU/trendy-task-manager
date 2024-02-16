import { httpAxios } from "@/helper/httpHelper";

export async function getTestUsers(query) {
  try {
    const { data } = await httpAxios.get(`/api/testuser?search=${query}`);
    return data;
  } catch (error) {
    console.error("Error fetching test users", error);
    throw new Error("Failed to fetch test users");
  }
}
