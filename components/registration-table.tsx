"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  getAllRegistrations,
    deleteRegistration,
  updateRegistration,
} from "../lib/registrationOperations";

export default function RegistrationTable() {
 interface Registration {
    id: string;
    name: string;
    email: string;
    dateOfBirth: string | number | Date
    phone: any
    address:any
}

  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const data = await getAllRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRegistration(id);
      fetchRegistrations();
    } catch (error) {
      console.error("Error deleting registration:", error);
    }
  };
    const handleEdit = async (id: string, data: Registration) => {
      try {
          await updateRegistration(id, data);
          fetchRegistrations();
      } catch (error) {
          console.error("Error updating registration:", error);
      }
    };
    
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registered Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((registration) => (
            <TableRow key={registration.id}>
              <TableCell>{registration.id}</TableCell>
              <TableCell>{registration.name}</TableCell>
              <TableCell>{registration.email}</TableCell>
              <TableCell>
                {new Date(registration.dateOfBirth).toLocaleDateString()}
              </TableCell>
              <TableCell>{registration.phone || "N/A"}</TableCell>
              <TableCell>{registration.address || "N/A"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleEdit(registration.id, registration)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(registration.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
