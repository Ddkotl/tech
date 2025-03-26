"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

async function fetchData(slug: string, type: string) {
  const res = await fetch(`/api/tag/${slug}?type=${type}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default function TagPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState("news");

  const { data, isLoading, error } = useQuery({
    queryKey: ["tagData", params.slug, activeTab],
    queryFn: () => fetchData(params.slug, activeTab),
    keepPreviousData: true, // Оставляет старые данные, пока грузятся новые
  });

  return (
    <div>
      <h1>Tag Page: {params.slug}</h1>
      <Tabs defaultValue="news" className="w-[400px]" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="news">
          {isLoading ? "Loading..." : error ? "Error loading data" : data?.content}
        </TabsContent>
        <TabsContent value="reviews">
          {isLoading ? "Loading..." : error ? "Error loading data" : data?.content}
        </TabsContent>
      </Tabs>
    </div>
  );
}
