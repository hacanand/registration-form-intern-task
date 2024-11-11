import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface Registration {
    id: string;
    name: string;
    email: string;
    dateOfBirth: string | number | Date
    phone: any
    address:any
}
export async function createRegistration(data: Registration) {
  try {
    const registration = await prisma.registration.create({
      data: {
        name: data.name,
        email: data.email,
        dateOfBirth: new Date(data.dateOfBirth),
        phone: data.phone,
        address: data.address,
      },
    });
    return registration;
  } catch (error) {
    console.error("Error creating registration:", error);
    throw error;
  }
}

export async function getAllRegistrations() {
  try {
    const registrations = await prisma.registration.findMany();
    return registrations;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    throw error;
  }
}

export async function getRegistrationById(id: string) {
  try {
    const registration = await prisma.registration.findUnique({
      where: { id: parseInt(id) },
    });
    return registration;
  } catch (error) {
    console.error("Error fetching registration:", error);
    throw error;
  }
}

export async function updateRegistration(id: string, data:Registration) {
  try {
    const updatedRegistration = await prisma.registration.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        email: data.email,
        dateOfBirth: new Date(data.dateOfBirth),
        phone: data.phone,
        address: data.address,
      },
    });
    return updatedRegistration;
  } catch (error) {
    console.error("Error updating registration:", error);
    throw error;
  }
}

export async function deleteRegistration(id: string) {
  try {
    await prisma.registration.delete({
      where: { id: parseInt(id) },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting registration:", error);
    throw error;
  }
}