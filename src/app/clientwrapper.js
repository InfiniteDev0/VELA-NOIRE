"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollingAnimations from "@/components/animations/ScrollingAnimations";
import Banner from "@/components/shared/Banner";
const ChatAssistantAi = dynamic(
  () => import("@/components/shared/ChatAssistantAi"),
  {
    ssr: false,
  }
);

const ClientWrapper = ({ children }) => {
  const pathname = usePathname();

  const hiddenRoutes = [
    "/auth",
  ];
  const shouldHideLayout = hiddenRoutes.some((route) =>
    pathname?.includes(route)
  );

  const chatRoutes = ["/", "/profile"];
  const shouldShowChat = chatRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <>
      <NextNProgress
        color="#29d"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Banner/>
      {!shouldHideLayout && <Navbar />}
      <ScrollingAnimations />
      {/* <AnimatePresence>
        {shouldShowChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <ChatAssistantAi />
          </motion.div>
        )}
      </AnimatePresence> */}

      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default ClientWrapper;
