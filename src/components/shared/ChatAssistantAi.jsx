"use client";
import React, { useEffect } from "react";

export default function ChatAssistantAi() {
  useEffect(() => {
    if (!document.getElementById("chtl-script")) {
      // Add Chatling config
      window.chtlConfig = { chatbotId: "8423435319" };

      // Create script tag
      const script = document.createElement("script");
      script.async = true;
      script.id = "chtl-script";
      script.type = "text/javascript";
      script.setAttribute("data-id", "8423435319");
      script.src = "https://chatling.ai/js/embed.js";

      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
