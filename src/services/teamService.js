import { httpAxios } from "@/helper/httpHelper";

export async function createTeam(formData) {
    console.log(formData);
  try {
    const { data } = await httpAxios.post(`/api/users/admin/team`, formData);
    return data;
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Failed to creat team");
  }
}
