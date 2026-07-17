import { ShieldAlert } from "lucide-react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="flex gap-2 items-center mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      role="alert"
    >
      <ShieldAlert />     
      {message}
    </div>
  );
};

export default ErrorMessage;