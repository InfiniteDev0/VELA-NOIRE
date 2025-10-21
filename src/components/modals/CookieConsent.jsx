"use client";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/lib/cookies";

export default function CookiesConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie("cookies_accepted")) setVisible(true);
  }, []);

  const handleAccept = () => {
    setCookie("cookies_accepted", "true", 365);
    setVisible(false);
  };

  const handleDecline = () => {
    setCookie("cookies_accepted", "false", 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-white shadow-lg rounded-lg p-4 w-80 z-50">
      <p className="text-sm text-gray-600">
        We use cookies to enhance your browsing experience. By clicking “Accept”
        you agree to our use of cookies.
      </p>
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={handleDecline}
          className="text-gray-500 hover:underline"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
