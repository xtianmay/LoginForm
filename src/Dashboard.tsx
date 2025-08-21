import React from "react";

type DashboardProps = {
  email: string;
  onLogout: () => void;
};

export default function Dashboard({ email, onLogout }: DashboardProps) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-4">Welcome, {email}!</h1>
      <p className="mb-6">You are now logged in.</p>
      <button
        onClick={onLogout}
        className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
