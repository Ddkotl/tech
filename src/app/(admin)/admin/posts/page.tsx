import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components";
import { DataTable } from "@/shared/components/custom/data-table";
import Link from "next/link";
import { columns } from "@/entities/post";

import { FaRegPlusSquare } from "react-icons/fa";
import { getAllPostsAction } from "@/entities/post";

export default async function PostsPage() {
  const posts = await getAllPostsAction();
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
        <div className="ml-auto flex items-center gap-2">
          <Link href="/admin/posts/create">
            <Button size="sm" className="h-8 gap-1">
              <FaRegPlusSquare className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Добавить
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="all">
        <DataTable data={posts} columns={columns} />
      </TabsContent>
    </Tabs>
  );
}
