import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BookmarkItem {
  id: string;
  name: string;
  category: 'destination' | 'heritage' | 'food' | 'stay';
  subtitle: string;
  imageUrl?: string;
  location: string;
  addedAt: string;
}

interface BookmarkContextType {
  bookmarks: BookmarkItem[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (item: BookmarkItem) => void;
  removeBookmark: (id: string) => void;
  clearBookmarks: () => void;
  savedCount: number;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const STORAGE_KEY = 'bharatveda_saved_places_v1';

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to sync bookmarks to localStorage:', e);
    }
  }, [bookmarks]);

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.id === id);
  };

  const toggleBookmark = (item: BookmarkItem) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === item.id)) {
        return prev.filter((b) => b.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        toggleBookmark,
        removeBookmark,
        clearBookmarks,
        savedCount: bookmarks.length,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
