import { Inbox } from "lucide-react";

const NoDataFound = ({
  title = "No data found",
  message = "There are no items to display.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <Inbox
        size={56}
        className="mb-4 text-gray-400"
      />

      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        {message}
      </p>
    </div>
  );
};

export default NoDataFound;