"use client";

import { useEffect, useState } from "react";
import { getAllTags } from "../_actions/get_all_tags";
import { TagsWithCounts } from "../_domain/types";
import { TagCard } from "./tag_card";

export function TagsList() {
  const [tags, setTags] = useState<TagsWithCounts[] | undefined>();

  useEffect(() => {
    getAllTags().then((tagsList) => setTags(tagsList));
  }, []);
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
      {tags?.map((tag) => (
        <TagCard
          key={tag.id}
          tagSlug={tag.slug}
          tagTitle={tag.title}
          newsCount={tag._count.news}
          reviewsCount={tag._count.reviews}
        />
      ))}
    </div>
  );
}
