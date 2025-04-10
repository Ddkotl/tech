// features/bookmarks/bookmarksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsBookmarksState {
  ids: string[]; // Будем хранить только ID новостей
}

const initialState: NewsBookmarksState = {
  ids: [], // Начинаем с пустого массива
};
const key = "news_bookmarks";
export const newsBbookmarksSlice = createSlice({
  name: key,
  initialState: initialState,
  reducers: {
    toggleNewsBookmark: (state, action: PayloadAction<string>) => {
      const index = state.ids.indexOf(action.payload);
      if (index === -1) {
        // Добавляем ID, если его нет
        state.ids.push(action.payload);
      } else {
        // Удаляем ID, если он есть
        state.ids.splice(index, 1);
      }
    },
    clearNewsBookmarks: (state) => {
      state.ids = [];
    },
  },
});

export const { toggleNewsBookmark, clearNewsBookmarks } = newsBbookmarksSlice.actions;

// Селекторы
export const selectNewsBookmarkIds = (state: { newsBookmarks: NewsBookmarksState }) => state.newsBookmarks.ids;
export const selectNewsBookmarksCount = (state: { newsBookmarks: NewsBookmarksState }) =>
  state.newsBookmarks.ids.length;
export const selectIsNewsBookmarked = (state: { newsBookmarks: NewsBookmarksState }, id: string) =>
  state.newsBookmarks.ids.includes(id);

export const newsBookmarksReducer = newsBbookmarksSlice.reducer;
