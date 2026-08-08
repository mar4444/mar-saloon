import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">

            <div className="space-y-3">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="w-14 h-14 rounded-full bg-gray-200"></div>

          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">

            <div className="space-y-3">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="w-14 h-14 rounded-full bg-gray-200"></div>

          </div>
        </div>

      </div>

      {/* Daily Report */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <div className="h-6 w-36 bg-gray-200 rounded mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gray-50 rounded-lg p-5 space-y-3">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardSkeleton;