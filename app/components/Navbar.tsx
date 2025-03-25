"use client";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, deleteAccount } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center text-black">
      <h1 className="text-xl font-bold">AlgoRoot</h1>
      {user && (
        <div className="relative">
          <button
            className="bg-gray-200 p-2 rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {user.name[0].toUpperCase()}
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
              <p className="px-4 py-2 text-gray-700">{user.name}</p>
              <p className="px-4 py-2 text-gray-500">{user.email}</p>
              <button
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                onClick={logout}
              >
                Logout
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-red-700 hover:bg-gray-100"
                onClick={deleteAccount}
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
