import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth(); // ✅ get logged-in user from context

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold">
            S
          </div>
          <div className="font-semibold text-lg text-gray-800">
            Strelema Dashboard
          </div>
        </div>

        {/* Logged-in user info */}
        {user ? (
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-700 font-medium">
              👤 {user.name || "Admin"}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-sm italic">
            Not logged in
          </div>
        )}
      </div>
    </header>
  );
}
