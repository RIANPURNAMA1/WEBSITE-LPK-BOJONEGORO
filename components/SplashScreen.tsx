"use client";
import { useState, useEffect } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 1200);
    const hide = setTimeout(() => setShow(false), 1600);
    return () => {
      clearTimeout(timer);
      clearTimeout(hide);
    };
  }, []);

  if (!show) return <>{children}</>;

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
          fade ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="relative mb-6">
          <div className="rounded-full border-4 border-[#007ab3]/20 p-3">
            <img src="/logo-2.png" alt="LPK Bojonegoro Mendunia" className="h-40 w-auto" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#007ab3] animate-spin" />
        </div>
      </div>
      {children}
    </>
  );
}
