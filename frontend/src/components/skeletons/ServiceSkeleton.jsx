import React from "react";

const ServiceSkeleton = ({ rows = 6 }) => {
  return (
    <table className="min-w-[850px] w-full">
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
                </tr>
            ))}
        </tbody>
    </table>
  );
};

export default ServiceSkeleton;