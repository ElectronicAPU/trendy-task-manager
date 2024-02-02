import { httpAxios } from "@/helper/httpHelper";

export async function signUp(user) {
  const result = await httpAxios
    .post("/api/users", user)
    .then((response) => response.data);

  return result;
}
export async function signIn(loginData) {
  const result = await httpAxios
    .post("/api/login", loginData)
    .then((response) => response.data);

  return result;
}
export async function loggedInUser() {
  const result = await httpAxios
    .get("/api/current")
    .then((response) => response.data);

  return result;
}
