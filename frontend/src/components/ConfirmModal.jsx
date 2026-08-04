import { TriangleAlert, Loader } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  productToDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-start gap-2 border-b border-gray-200 bg-green-50 px-6 py-4">
          <TriangleAlert />
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
        </div>

        <div className="px-6 py-5">
          <p className="text-gray-600">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={() => onConfirm(productToDelete)}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (<Loader size={22} className="animate-spin" />) : (confirmText)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;