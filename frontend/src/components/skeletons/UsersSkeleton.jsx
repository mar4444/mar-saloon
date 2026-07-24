import React from "react";

const UsersSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="space-y-2">
        <div className="h-7 w-32 rounded bg-gray-200"></div>
        <div className="h-4 w-28 rounded bg-gray-200"></div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        {/* Search */}
        <div className="h-10 w-full md:max-w-sm rounded-lg bg-gray-200"></div>

        {/* Select */}
        <div className="h-10 w-full md:w-56 rounded-lg bg-gray-200"></div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[850px] w-full border border-gray-100">

          {/* Table Header */}
          <thead className="bg-green-50">
            <tr>
              {["", "", "", "", ""].map((_, index) => (
                <th key={index} className="p-4">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>

            {Array.from({ length: 6 }).map((_, row) => (
              <tr
                key={row}
                className="border-t border-gray-100"
              >

                {/* Name */}
                <td className="p-4">
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                </td>

                {/* Email */}
                <td className="p-4">
                  <div className="h-4 w-48 rounded bg-gray-200"></div>
                </td>

                {/* Phone */}
                <td className="p-4">
                  <div className="h-4 w-28 rounded bg-gray-200"></div>
                </td>

                {/* Role */}
                <td className="p-4">
                  <div className="h-7 w-24 rounded-full bg-gray-200"></div>
                </td>

                {/* Action */}
                <td className="p-4 text-center">
                  <div className="h-6 w-6 rounded-full bg-gray-200 mx-auto"></div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
};

export default UsersSkeleton;