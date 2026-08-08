import React, { useEffect } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  UserRound,
} from "lucide-react";
import Layout from "../layout/Layout";
import useDashboardStore from "../store/dashboardStore";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";
import ErrorMessage from "../components/ErrorMessage";

const Dashboard = () => {
  const { loading, totalUsersAndSales, getTotalUsersAndSales, dailyReports, todayReport, error, reportPerBarber, todayBarberReport } = useDashboardStore();

  useEffect(() => {
    getTotalUsersAndSales();
    dailyReports();
    reportPerBarber();
  }, []);

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

        {loading && (
          <DashboardSkeleton />
        )}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading && !error && (
          <>
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
                      {totalUsersAndSales.totalUsers}
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
                      {totalUsersAndSales.totalSales}
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
                    {todayReport.totalSales}
                  </h3>

                </div>

                <div className="bg-gray-50 rounded-lg p-5">

                  <p className="text-gray-500">
                    Total Income
                  </p>

                  <h3 className="text-3xl font-bold mt-2 text-green-600">
                    {todayReport.totalIncome}
                  </h3>

                </div>

              </div>

            </div>

            {/* Barber Report */}
            <div>

              <h3 className="text-xl font-semibold mb-5">
                Barber Report Today
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {todayBarberReport.map((barberReport)=>(
                  <div
                    key={barberReport.barberId}
                    className="bg-white border border-gray-100 rounded-xl shadow-sm p-6"
                  >

                    <div className="flex items-center gap-4 mb-5">

                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserRound className="text-blue-600" />
                      </div>

                      <div>

                        <h4 className="font-semibold">
                          {barberReport.barber.name}
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
                          {barberReport.totalCustomers}
                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span className="text-gray-500">
                          Income
                        </span>

                        <span className="font-semibold text-green-600">
                          {barberReport.totalIncome}
                        </span>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          </>
        )}

      </div>
    </Layout>
  );
};

export default Dashboard;