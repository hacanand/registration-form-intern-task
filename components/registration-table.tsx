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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  getAllRegistrations,
    deleteRegistration,
  updateRegistration,
} from "../lib/registrationOperations";
import {toast} from "sonner"
import RegistrationForm from "./registration-form";
import EditDialogForm from "./edit-dialog-form";
export default function RegistrationTable() {
  interface Registration {
   id: number ;
   name: string;
   email: string;
   dateOfBirth: string | number | Date;
   phone: any;
   address: any;
 }
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    //set to localStorage
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setFetching(true);
    
    try {

      const data = await getAllRegistrations();
      setRegistrations(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Error fetching registrations:", error);
    }
    finally {
      setFetching(false);
    }
  };
  // console.log(fetching)
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
          // await updateRegistration(id, data);
        // fetchRegistrations();

        // console.log("Edit registration with ID:", id);

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
          {fetching ? (
            <div className="p-4 text-xl ">Loading...</div>
          ) : (
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
                        onClick={() =>
                          handleEdit(registration.id.toString(), registration)
                        }
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click update when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <EditDialogForm />
                      </div>
                      {/* <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div> */}
                      <DialogFooter>
                        <Button type="submit">Update</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* 
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() =>
                      handleEdit(registration.id.toString(), registration)
                    }
                  >
                    Edit
                  </Button> */}

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
