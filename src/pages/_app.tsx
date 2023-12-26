import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { api } from "@/utils/api";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { MdArrowUpward } from "react-icons/md";
import ScrollToTop from "react-scroll-to-top";

/**
 * Custom ScrollToTopButton Component
 *
 * This component renders a button to scroll the page to the top when clicked.
 *
 * @returns {React.Component} - The rendered ScrollToTopButton component.
 */
function ScrollToTopButton() {
  return (
    <div className="group rounded-full bg-black p-2 text-white">
      <MdArrowUpward size="1.5em" />
    </div>
  );
}

/**
 * Custom Next.js App Component
 *
 * This component serves as the root component for the Next.js application.
 *
 * @param {Object} props - Component properties.
 * @param {React.Component} props.Component - The current active component.
 * @param {Object} props.pageProps - The initial properties that were preloaded for the current route.
 * @param {Session | null} props.session - The user session information.
 * @returns {React.Component} - The rendered MyApp component.
 */
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {/* Toast notifications */}
      <Toaster />

      {/* Progress bar for page loading */}
      <NextNprogress
        color="#424242"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />

      {/* Render the active component */}
      <Component {...pageProps} />

      {/* Scroll to top button */}
      <ScrollToTop
        component={<ScrollToTopButton />}
        smooth
        style={{
          background: "transparent",
          // Simple shadow
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          borderRadius: "50%",
          position: "fixed",
          bottom: 20,
          overflow: "visible",
          zIndex: 100,
          right: 20,
        }}
        color="#"
      />
    </SessionProvider>
  );
};

// Enhance the app with the TRPC context from the api
export default api.withTRPC(MyApp);
