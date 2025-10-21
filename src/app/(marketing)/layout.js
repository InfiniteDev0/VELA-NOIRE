// app/(marketing)/layout.js
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
// import CountrySelector from "@/components/modals/CountrySelector";
import CookieConsent from "@/components/modals/CookieConsent";


export default function MarketingLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* <CountrySelector />
      <CookieConsent /> */}
      {children}
      <Footer />
    </>
  );
}
