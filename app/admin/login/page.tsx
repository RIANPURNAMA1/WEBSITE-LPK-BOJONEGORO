"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Password salah");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#007ab3]/10 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-[#007ab3]" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Admin Login</h1>
          <p className="text-sm text-slate-400 mt-1">LPK Bojonegoro Mendunia</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password admin"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#007ab3] hover:bg-[#00608e] text-white font-semibold rounded-lg transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
