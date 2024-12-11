'use server'

import { dataBase } from "@/shared/lib/db_conect"



export async function getFeaturedPost() {
  return await dataBase.post.findFirst({
    orderBy: { views: 'desc' },
    include: {
      category: true,
      _count: {
        select: { likes: true, bookmarks: true }
      }
    }
  })
}

export async function getRecentPosts() {
  return await dataBase.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: {
      category: true,
      _count: {
        select: { likes: true, bookmarks: true }
      }
    }
  })
}

export async function getPopularPosts() {
  return await dataBase.post.findMany({
    orderBy: { views: 'desc' },
    take: 3,
    include: {
      category: true,
      _count: {
        select: { likes: true, bookmarks: true }
      }
    }
  })
}

export async function getPopularCategories() {
  return await dataBase.category.findMany({
    orderBy: {
      posts: {
        _count: 'desc'
      }
    },
    take: 4,
    include: {
      _count: {
        select: { posts: true }
      }
    }
  })
}

