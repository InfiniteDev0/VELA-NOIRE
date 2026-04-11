import { Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import ClientWrapper from "./clientwrapper";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200"], // Multiple weights for better flexibility
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300"], // Multiple weights for better flexibility
});

export const metadata = {
  title: "Vela Noire - Luxury MiddleEastern Wear",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${poppins.variable} ${outfit.className} antialiased font-outfit`}
      >
        <Toaster position="top-center" theme="dark" richColors closeButton />
        <SpeedInsights />
        <ShopProvider>
          <AuthProvider>
            <AppProvider>
              <Suspense fallback={null}>
                <ClientWrapper>{children}</ClientWrapper>
              </Suspense>
            </AppProvider>
          </AuthProvider>
        </ShopProvider>
      </body>
    </html>
  );
}
