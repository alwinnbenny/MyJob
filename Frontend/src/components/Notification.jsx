import { CheckCircle, XCircle, X } from "lucide-react";


export const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  const isError = notification.type === "error";

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white transition-all duration-300 ${
        isError ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {isError ? <XCircle size={20} /> : <CheckCircle size={20} />}
      <span className="text-sm font-medium">{notification.message}</span>
      <button
        onClick={onClose}
        className="ml-2 opacity-75 hover:opacity-100"
      >
        <X size={16} />
      </button>
    </div>
  );
};
