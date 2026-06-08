"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type SiteData = {
  hero: { title: string; subtitle: string };
  about: string;
  programs: string;
  contact: string;
};

const STORAGE_KEY = "siteData_v1";

const DEFAULT_DATA: SiteData = {
  hero: {
    title: "Selamat Datang di LPK Bojonegoro Mendunia",
    subtitle: "Siap berangkat ke Jepang",
  },
  about: "LPK Bojonegoro Mendunia adalah lembaga pelatihan kerja profesional...",
  programs: JSON.stringify([
    { title: "Program A", description: "Deskripsi program A" },
    { title: "Program B", description: "Deskripsi program B" },
  ], null, 2),
  contact: "Alamat, telepon, email",
};

const AdminContext = createContext<{
  data: SiteData;
  setData: (d: SiteData) => void;
  save: () => void;
  reset: () => void;
} | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(DEFAULT_DATA);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData((d) => ({ ...d, ...parsed }));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // ignore
    }
  };

  const reset = () => {
    setData(DEFAULT_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <AdminContext.Provider value={{ data, setData, save, reset }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}

export default AdminProvider;
