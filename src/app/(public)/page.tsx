import { Button } from "@/shared/components";

import Link from "next/link";

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Blog</h1>

      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/posts">View All Posts</Link>
        </Button>
      </div>
    </div>
  );
}
