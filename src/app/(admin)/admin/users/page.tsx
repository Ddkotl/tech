import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components";
import { DataTable } from "@/shared/components/custom/data-table";

import { columns } from "@/entities/user/user";

import { getAllUsersAction } from "@/entities/user/user";

export default async function UsersPage() {
  const users = await getAllUsersAction();
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all">
        <DataTable data={users} columns={columns} />
      </TabsContent>
    </Tabs>
  );
}
