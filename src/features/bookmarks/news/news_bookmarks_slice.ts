// features/bookmarks/bookmarksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const news_bookmarks_key = "news_bookmarks";

interface NewsBookmarksState {
  news_ids: string[];
  isNewsBookmarksStateInit: boolean;
}
const initialNewsBookmarksState: NewsBookmarksState = {
  news_ids: [],
  isNewsBookmarksStateInit: false,
};

export const newsBbookmarksSlice = createSlice({
  name: news_bookmarks_key,
  initialState: initialNewsBookmarksState,
  reducers: {
    toggleNewsBookmark: (state, action: PayloadAction<string>) => {
      const index = state.news_ids.indexOf(action.payload);
      if (index === -1) {
        // Добавляем ID, если его нет
        state.news_ids.push(action.payload);
      } else {
        // Удаляем ID, если он есть
        state.news_ids.splice(index, 1);
      }
      localStorage.setItem(news_bookmarks_key, JSON.stringify(state.news_ids));
    },
    clearNewsBookmarks: (state) => {
      state.news_ids = [];
      localStorage.removeItem(news_bookmarks_key);
    },
    initNewsBookmarks: (state) => {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(news_bookmarks_key);
        state.news_ids = data ? JSON.parse(data) : [];
      }
      state.isNewsBookmarksStateInit = true;
    },
  },
});

export const { toggleNewsBookmark, clearNewsBookmarks, initNewsBookmarks } = newsBbookmarksSlice.actions;

// Селекторы
export const selectNewsBookmarkIds = (state: { newsBookmarks: NewsBookmarksState }) => state.newsBookmarks.news_ids;
export const selectNewsBookmarksCount = (state: { newsBookmarks: NewsBookmarksState }) =>
  state.newsBookmarks.news_ids.length;
export const selectIsNewsBookmarked = (state: { newsBookmarks: NewsBookmarksState }, id: string) =>
  state.newsBookmarks.news_ids.includes(id);
export const selectIsNewsBookmarksStateInit = (state: { newsBookmarks: NewsBookmarksState }) =>
  state.newsBookmarks.isNewsBookmarksStateInit;

export const newsBookmarksReducer = newsBbookmarksSlice.reducer;
