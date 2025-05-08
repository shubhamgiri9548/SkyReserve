import React from "react";
import { Trash2 } from "lucide-react";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200"
    >
      <Trash2 className="w-4 h-4" />
      Delete Flight
    </button>
  );
};

export default DeleteButton;
