import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import EventDetails from "./pages/EventDetails";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { BookingsProvider } from "./context/BookingsContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <BookingsProvider>
      <ScrollToTop />
      <Navbar />
      <main className="pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/explore"
              element={
                <PageWrapper>
                  <Explore />
                </PageWrapper>
              }
            />
            <Route
              path="/events/:id"
              element={
                <PageWrapper>
                  <EventDetails />
                </PageWrapper>
              }
            />
            <Route
              path="/book/:id"
              element={
                <PageWrapper>
                  <Booking />
                </PageWrapper>
              }
            />
            <Route
              path="/booking/:bookingId/confirmed"
              element={
                <PageWrapper>
                  <BookingConfirmation />
                </PageWrapper>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <NotFound />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </BookingsProvider>
  );
}
