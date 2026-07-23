import React from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  UserRound,
} from "lucide-react";
import Layout from "../layout/Layout";

const Dashboard = () => {
  return (
    <Layout pageTitle="Dashboard">
      <div className="space-y-8">

        {/* Welcome */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold">
            Dashboard
          </h2>

          <p className="text-gray-400 font-semibold">
            Welcome back! Here's an overview of your salon today.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Total Users
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  18
                </h3>

              </div>

              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-600" />
              </div>

            </div>
          </div>

          {/* Sales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Total Sales
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  254
                </h3>

              </div>

              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingBag className="text-green-600" />
              </div>

            </div>
          </div>

        </div>

        {/* Daily Report */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

          <h3 className="text-lg font-semibold mb-6">
            Daily Report
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-lg p-5">

              <p className="text-gray-500">
                Total Sales Today
              </p>

              <h3 className="text-3xl font-bold mt-2">
                15
              </h3>

            </div>

            <div className="bg-gray-50 rounded-lg p-5">

              <p className="text-gray-500">
                Total Income
              </p>

              <h3 className="text-3xl font-bold mt-2 text-green-600">
                250,000 RWF
              </h3>

            </div>

          </div>

        </div>

        {/* Barber Report */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Barber Report
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {[1,2,3,4].map((item)=>(
              <div
                key={item}
                className="bg-white border border-gray-100 rounded-xl shadow-sm p-6"
              >

                <div className="flex items-center gap-4 mb-5">

                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserRound className="text-blue-600" />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      John Doe
                    </h4>

                    <p className="text-sm text-gray-500">
                      Barber
                    </p>

                  </div>

                </div>

                <div className="space-y-3">

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Customers
                    </span>

                    <span className="font-semibold">
                      18
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Income
                    </span>

                    <span className="font-semibold text-green-600">
                      150,000 RWF
                    </span>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;