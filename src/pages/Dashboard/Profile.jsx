

import React from "react";
import { useSelector } from "react-redux";
import { UserCircle } from "lucide-react";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 text-green-700 rounded-full p-4 mr-4">
          <UserCircle size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-500">User account overview</p>
        </div>
      </div>

      <div className="space-y-4 text-lg text-gray-700">
        <div>
          <span className="font-medium">👤 Name:</span> {user?.name}
        </div>
        <div>
          <span className="font-medium">📧 Email:</span> {user?.email}
        </div>
        <div>
          <span className="font-medium">🛡️ Role:</span>{" "}
          <span className="uppercase tracking-wide text-green-600 font-semibold">
            {user?.role}
          </span>
        </div>
        <div>
          <span className="font-medium">💰 Wallet Balance:</span>{" "}
          <span className="text-green-700 font-bold">₹{user?.walletBalance}</span>
        </div>
      </div>
    </div>
  );
}

