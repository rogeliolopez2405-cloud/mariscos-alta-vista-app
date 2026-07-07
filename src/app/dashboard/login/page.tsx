"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        throw new Error("Incorrect passcode.");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full bg-white rounded-2xl shadow-lg p-8 border border-maroon/10"
      >
        <h1 className="text-xl font-bold text-maroon mb-1">Mariscos Alta Vista</h1>
        <p className="text-sm text-foreground/60 mb-6">Owner dashboard</p>
        <label className="block text-sm font-semibold mb-1">Passcode</label>
        <input
          type="password"
          autoFocus
          className="w-full border rounded-lg px-3 py-2 mb-4"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-maroon text-white py-3 rounded-full font-semibold disabled:opacity-50"
        >
          {submitting ? "Checking..." : "Log in"}
        </button>
      </form>
    </main>
  );
}
