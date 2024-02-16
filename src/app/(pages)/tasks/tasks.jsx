"use client";
import MainLayout from "@/components/layouts/main-layout";
import { useState, useEffect } from "react";
import { getTestUsers } from "@/services/testUsersService";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Users } from "lucide-react";

const Tasks = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getTestUsers(query);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching test users", error);
      }
    };

    // Fetch users only if query is not empty and has at least 2 characters
    if (query.length === 0 || query.length > 1) fetchUsers();
  }, [query]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-2 justify-between items-center w-full">
        <div className="flex gap-2">
          <Users />
          <h1 className="font-bold text-xl">Dummy Users Table</h1>
        </div>
        <div className="flex gap-2">
          <input
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border w-full sm:w-96 h-10 p-2 rounded-lg"
            placeholder="Search by first name, last name & email..."
          />
          <Button
            radius="sm"
            color="warning"
            variant="shadow"
            className="font-semibold"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="w-full py-6">
        <Table aria-label="Users table">
          <TableHeader>
            <TableColumn>First Name</TableColumn>
            <TableColumn>Last Name</TableColumn>
            <TableColumn>Email</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Tasks;
