import React from "react";
import Layout from "../layout/Layout";
import { PackagePlus } from "lucide-react"

const NewSales = () => {
  return (
    <Layout pageTitle="New Sales">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          {/* Header */}
          <div className="border-b border-green-200 px-6 py-5">
            <div className="flex items-center justify-start gap-2">
              <div className="p-3 bg-green-100 rounded-md">
                <PackagePlus size={18} />
              </div>
              <h2 className="text-xl md:text-base font-bold text-gray-600">Create New Sale</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to record a new sale.
            </p>
          </div>

          {/* Form */}
          <form className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Barber */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Barber
                </label>

                <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Select Barber</option>
                </select>
              </div>

              {/* Service */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Service
                </label>

                <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Select Service</option>
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Method
                </label>

                <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Select Payment Method</option>
                </select>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Status
                </label>

                <select
                  defaultValue="PENDING"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                </select>
              </div>
            </div>

            {/* Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="w-full lg:w-auto rounded-lg bg-green-600 px-8 py-3 font-medium cursor-pointer text-white transition hover:bg-green-700"
              >
                Create Sale
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewSales;