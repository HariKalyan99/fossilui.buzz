import { createContext, useContext, useEffect, useMemo, useState } from "react";

const BookingsContext = createContext(null);

const STORAGE_KEY = "evently:bookings";

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  const addBooking = (booking) => {
    const id = `BK-${Date.now().toString(36).toUpperCase()}`;
    const newBooking = { ...booking, id, createdAt: new Date().toISOString() };
    setBookings((b) => [newBooking, ...b]);
    return newBooking;
  };

  const removeBooking = (id) => {
    setBookings((b) => b.filter((bk) => bk.id !== id));
  };

  const value = useMemo(
    () => ({ bookings, addBooking, removeBooking }),
    [bookings],
  );

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
}

export function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error("useBookings must be used within BookingsProvider");
  return ctx;
}
