// app/components/PuppetAscii.tsx
"use client";

import { Anonymous_Pro } from "next/font/google";

const anonPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ASCII = String.raw`
 ____    _   _   ____    ____    _____   _____ 
|  _ \  | | | | |  _ \  |  _ \  | ____| |_   _|
| |_) | | | | | | |_) | | |_) | |  _|     | |  
|  __/  | |_| | |  __/  |  __/  | |___    | |  
|_|      \___/  |_|     |_|     |_____|   |_|  
  
`;

export default function PuppetAscii() {
  return (
    <div
      className={`relative anon-bold ${anonPro.className}`}
      style={{
        color: "#fff",
      }}
    >
      {/* optional left gutter line (like the screenshot) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 8,
          top: 0,
          bottom: 0,

          opacity: 0.9,
        }}
      />
      <pre
        style={{
          margin: 0,
          fontSize: "8px",
          lineHeight: 1,
          whiteSpace: "pre",
          tabSize: 2,
          letterSpacing: 0,
        }}
      >
        {ASCII}
      </pre>
    </div>
  );
}
