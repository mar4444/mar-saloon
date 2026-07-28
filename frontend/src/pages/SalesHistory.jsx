import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import useSalesStore from "../store/salesStore";
import Pagination from "../components/Pagination";

const SalesHistory = () => {
  const { loading, error, sales, loadingSales, totalPages, getAllSales } = useSalesStore();

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3);
  const [service, setService] = useState("")
  const [barber, setBarber] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  const [tab, setTab] = useState("");

  useEffect(() => {
    getAllSales(page, limit, start, end, service, barber)
  }, [page, limit, start, end, service, barber]);

  // Today sales
//   const handleToday = () => {
//     const today = new Date();

//     const date = today.toISOString().split("T")[0];

//     setStart(date);
//     setEnd(date);

//     setPage(1);

//     console.log(date)
// };

const handleToday = () => {
  const today = new Date().toISOString().split("T")[0];

  setStart(today);
  setEnd(today);
  setPage(1);

  console.log(today)
};

//Yesterday sales
// const handleYesterday = () => {
//     const yesterday = new Date();

//     yesterday.setDate(yesterday.getDate() - 1);

//     const date = yesterday.toISOString().split("T")[0];

//     setStart(date);
//     setEnd(date);

//     setPage(1);

//     console.log(date)
// };

const handleYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const date = yesterday.toISOString().split("T")[0];

  setStart(date);
  setEnd(date);
  setPage(1);

  console.log(date)
};

// This week sales
const handleThisWeek = () => {
    const today = new Date();

    const firstDay = new Date(today);

    firstDay.setDate(today.getDate() - today.getDay());

    const startDate = firstDay.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];

    setStart(startDate);
    setEnd(endDate);

    setPage(1);

    console.log(startDate)
    console.log(endDate)
};

// This months sales
const handleThisMonth = () => {
    const today = new Date();

    const firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    const startDate = firstDay.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];

    setStart(startDate);
    setEnd(endDate);

    setPage(1);

    console.log(startDate)
    console.log(endDate)
};


  return (
    <Layout pageTitle="Sales History">
      <div className="space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold">
            Sales History
          </h2>

          <p className="text-gray-400 font-semibold">45 Total sales</p>
        </div>

        {/* Filters */}
        <div className="">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search by barber..."
                className="w-full border border-gray-300 rounded-md px-4 py-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date Filter */}
            <div className="">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {/* Service */}
                <div className="">
                    <select className="w-full border border-gray-100 bg-white rounded-md px-4 py-1 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500">
                        <option>All Services</option>
                    </select>
                </div>

                <button 
                  onClick={() => {
                    handleToday();
                    setTab("Today")
                  }}

                  className={`border border-gray-100 rounded-md py-1 cursor-pointer
                    ${ tab === "Today" ? 'bg-green-500 text-white' : 'bg-white hover:bg-blue-50'}`}
                >
                  Today
                </button>

                <button
                  onClick={() => {
                    handleYesterday();
                    setTab("Yesterday")
                  }}
                  className={`border border-gray-100 rounded-md py-1 cursor-pointer
                    ${ tab === "Yesterday" ? 'bg-green-500 text-white' : 'bg-white hover:bg-blue-50'}`}
                >
                  Yesterday
                </button>

                <button
                  // onClick={handleThisWeek} 
                  // className="border border-gray-100 rounded-md py-1 bg-white hover:bg-blue-50 cursor-pointer"

                  onClick={() => {
                    handleThisWeek();
                    setTab("Week")
                  }}
                  className={`border border-gray-100 rounded-md py-1 cursor-pointer
                    ${ tab === "Week" ? 'bg-green-500 text-white' : 'bg-white hover:bg-blue-50'}`}
                >
                  This Week
                </button>

                <button 
                  // onClick={handleThisMonth}
                  // className="border border-gray-100 rounded-md py-1 bg-white hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    handleThisMonth();
                    setTab("Month")
                  }}
                  className={`border border-gray-100 rounded-md py-1 cursor-pointer
                    ${ tab === "Month" ? 'bg-green-500 text-white' : 'bg-white hover:bg-blue-50'}`}
                >
                  This Month
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border border-gray-100">
              <thead className="bg-green-50">
                <tr className="text-left text-gray-400 text-sm">
                  <th className="p-4">
                    Barber
                  </th>
                  <th className="py-4">
                    Service
                  </th>
                  <th className="p-4">
                    Amount Paid
                  </th>
                  <th className="p-4">
                    Payment Status
                  </th>
                  <th className="p-4">
                    Created At
                  </th>
                </tr>
              </thead>

              <tbody>

                {/* <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    John Doe
                  </td>
                  <td className="p-4 text-gray-600">
                    Hair Cut
                  </td>
                  <td className="p-4 text-gray-600">
                    10,000 RWF
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      PAID
                    </span>
                  </td>
                  <td className="p-4">
                    22 Jul 2026
                  </td>
                </tr> */}

                {sales.map((sale) => (
                  <tr 
                    key={sale.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {sale.barber.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {sale.Service.serviceName}
                    </td>

                    <td className="p-4">
                      {sale.amountPaid}
                    </td>

                    <td className="p-4 text-gray-600">
                      {sale.paymentStatus}
                    </td>

                    <td className="p-4 text-gray-500">
                      {new Date(sale.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

          {/* Pagination */}
          {/* <Pagination /> */}

          {sales.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}

          {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-t">

            <p className="text-sm text-gray-500">
              Showing 1–10 of 52 sales
            </p>

            <div className="flex gap-2">

              <button className="border px-4 py-1 rounded-lg cursor-pointer">
                Previous
              </button>

              <button className="bg-green-600 text-white px-4 py-1 rounded-lg cursor-pointer">
                1
              </button>

              <button className="border px-4 py-1 rounded-lg cursor-pointer">
                2
              </button>

              <button className="border px-4 py-1 rounded-lg cursor-pointer">
                Next
              </button>

            </div>

          </div> */}

        </div>

      </div>
    </Layout>
  );
};

export default SalesHistory;