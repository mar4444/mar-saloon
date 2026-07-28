import React from "react";

const SalesSkeleton = ({ rows = 6 }) => {
  return (
    <table>
        <tbody className="animate-pulse">
            {Array.from({ length: rows }).map((_, index) => (
                <tr
                    key={index}
                    className="border-t border-gray-100"
                >
                {/* Barber */}
                    <td className="p-4">
                        <div className="h-4 w-32 rounded bg-gray-200"></div>
                    </td>

                    {/* Service */}
                    <td className="p-4">
                        <div className="h-4 w-28 rounded bg-gray-200"></div>
                    </td>

                    {/* Amount */}
                    <td className="p-4">
                        <div className="h-4 w-20 rounded bg-gray-200"></div>
                    </td>

                    {/* Payment Status */}
                    <td className="p-4">
                        <div className="h-7 w-24 rounded-full bg-gray-200"></div>
                    </td>

                    {/* Created At */}
                    <td className="p-4">
                        <div className="h-4 w-40 rounded bg-gray-200"></div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  );
};

export default SalesSkeleton;