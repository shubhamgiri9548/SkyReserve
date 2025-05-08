
import { useSelector } from "react-redux";
import { ShieldCheck } from "lucide-react";


export default function AdminProfile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl mx-auto mt-10">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 text-blue-700 rounded-full p-4 mr-4">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Admin Profile</h2>
          <p className="text-sm text-gray-500">System Administrator Details</p>
        </div>
      </div>

      <div className="space-y-4 text-lg text-gray-700">
        <div>
          <span className="font-medium">👤 Name:</span> {user.name}
        </div>
        <div>
          <span className="font-medium">📧 Email:</span> {user.email}
        </div>
        <div>
          <span className="font-medium">🛡️ Role:</span>{" "}
          <span className="uppercase tracking-wide text-blue-600 font-semibold">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}

