import RegistrationForm from "@/components/registration-form";
import RegistrationTable from "@/components/registration-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main>
      <Tabs
        defaultValue="account"
        className="w-full h-full p-6 flex flex-col items-center"
      >
        <TabsList className=" p-6">
          <TabsTrigger value="account" className="font-bold text-xl">
            Registration Form
          </TabsTrigger>
          <TabsTrigger value="password" className="font-bold text-xl">
            Registered Users
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
        <RegistrationForm/>
        </TabsContent>
        <TabsContent value="password">
          <RegistrationTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}
