import { loggedInUser } from "@/services/userService";
import Dashboard from "./dashboard";

export const metadata = {
  title: "Dashboard",
  description: "Hello it's a dashboard",
};

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
