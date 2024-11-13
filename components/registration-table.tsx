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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  getAllRegistrations,
    deleteRegistration,
  
} from "../lib/registrationOperations";
import {toast} from "sonner"
// import RegistrationForm from "./registration-form";
import EditDialogForm from "./edit-dialog-form";
export default function RegistrationTable() {
  interface Registration {
   id: number ;
   name: string;
   email: string;
   dateOfBirth: string | number | Date;
   phone: string | null |undefined;
   address: string | null|undefined;
 }
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [fetching, setFetching] = useState(false);
  // const[editing, setEditing] = useState();
  useEffect(() => {
    fetchRegistrations();
  }, []);
  const fetchRegistrations = async () => {
    setFetching(true);
    try {
      const data = await getAllRegistrations();
      setRegistrations(data);
    } catch (error) {
      toast.error("An error occurred while fetching all data");
      console.error("Error fetching registrations:", error);
    }
    finally {
      setFetching(false);
    }
  };
  console.log(registrations)
  const handleDelete = async (id: string) => {
    try {
      await deleteRegistration(id);
      fetchRegistrations();
    } catch (error) {
      toast.error("An error occurred while deleting a data")
      console.error("Error deleting registration:", error);
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
          {fetching ? "Loading..." : (
            registrations.map((registration) => (
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="mr-2"
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click update when
                          you are done.
                        </DialogDescription>
                      </DialogHeader>
                    
                        <EditDialogForm data={registration} />
                    
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(registration.id.toString())}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
