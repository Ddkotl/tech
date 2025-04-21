import { getAllUsers } from "@/entities/user/_actions/get-all-user";
import { columns } from "@/entities/user/_ui/users_table_colums";
import { Button } from "@/shared/components";
import { DataTable } from "@/shared/components/custom/data-table";
import { Search } from "@/shared/components/custom/search";
import Link from "next/link";

export default async function UsersPage() {
  const users = await getAllUsers();
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4">
        <Search placeholder="Поиск пользователя" />
        <Link href="/admin/user/create">
          <Button variant="default">Добавить пользователя</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
