"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getNews } from "./_action/get-news-action";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, TimeAgo } from "@/shared/components";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { News } from "@prisma/client";
import Link from "next/link";
import { FaBookmark, FaEye } from "react-icons/fa";

export default function NewsList({
  initialNews,
  totalPages,
  initialPage,
}: {
  initialNews: News[];
  totalPages: number;
  initialPage: number;
}) {
  const [news, setNews] = useState(initialNews);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const router = useRouter();

  const handlePageChange = async (page: number) => {
    const result = await getNews(page);
    setNews(result.newsWithIncludes);
    setCurrentPage(result.currentPage);
    router.push(`/news?page=${page}`, { scroll: false });
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 mb-8">
        {news.map((item) => (
          <Card key={item.id} className="flex flex-col sm:flex-row items-stretch gap-4 ">
            {item.previewImage && (
              <div className="sm:w-1/3">
                <Image
                  src={item.previewImage || "/placeholder.svg"}
                  alt={item.title}
                  width={200}
                  height={100}
                  className="object-scale-down sm:object-contain lg:object-contain w-full h-48 sm:h-full rounded-md"
                />
              </div>
            )}
            <div className="flex flex-col justify-between sm:w-2/3">
              <CardHeader>
                <CardTitle>
                  <Link href={`/news/${item.slug}`} className="hover:text-blue-600 text-xl">
                    {item.title}
                  </Link>
                </CardTitle>
                <div className="text-md flex flex-col sm:flex-row justify-between items-start sm:items-center text-foreground/80">
                  <div>
                    Опубликовано: <TimeAgo date={item.createdAt} />
                  </div>
                  <div className="flex gap-4 sm:gap-10 mt-2 sm:mt-0">
                    <div className="flex items-center space-x-2">
                      <FaEye className="text-blue-500" aria-hidden="true" />
                      <span>{item.views} просмотров</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaBookmark className="text-yellow-500" aria-hidden="true" />
                      {/* <span>{item.} закладок</span> */}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{item.meta_description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href={`/news/${item.slug}`}>Читать больше</a>
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
      <Pagination className="flex flex-col items-center">
        <PaginationContent className="flex gap-2 flex-wrap justify-center">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href="#" onClick={() => handlePageChange(page)} isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={`${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
