import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { PackagePlus, Loader } from "lucide-react"
import useServiceStore from "../store/serviceStore";
import useUserStore from "../store/userStore";
import usePaymentStore from "../store/paymentStore";
import { useToast } from "../context/ToastContext";
import useSalesStore from "../store/salesStore";
import { useNavigate } from "react-router-dom";

const NewSales = () => {
  const navigate = useNavigate();

  const { services, getAllServices } = useServiceStore();
  const { users, getAllBarbersUsers } = useUserStore();
  const { paymentMethods, getAllPaymentMethods } = usePaymentStore();
  const { showToast } = useToast();
  const { sale, loading, errorUpdate, loadingButton, createSale } = useSalesStore();

  const [formData, setFormData] = useState({
    barberId: "",
    serviceId: "",
    paymentMethodId: "",
    paymentStatus: "",
  });

  // Get services, Payments method and barbers
  useEffect(() => {
    getAllServices()
    getAllPaymentMethods()
    getAllBarbersUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const saleToCreate = await createSale(formData)

    if(saleToCreate.success) {
      showToast(saleToCreate.message, "success");
      navigate("/sales-history");
    } else {
      showToast(saleToCreate.message, "error");
    }
  }

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
          <form 
            onSubmit={handleSubmit}
            className="p-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Barber */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Barber
                </label>

                <select 
                  value={formData.barberId}
                  onChange={(e) => setFormData({ ...formData, barberId: Number(e.target.value)})}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Barber</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Service
                </label>

                <select 
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: Number(e.target.value) })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.serviceName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Method
                </label>

                <select 
                  value={formData.paymentMethodId}
                  onChange={(e) => setFormData({ ...formData, paymentMethodId: Number(e.target.value) })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Payment Method</option>
                  {paymentMethods.map((paymentMethod) => (
                    <option key={paymentMethod.id} value={paymentMethod.id}>
                      {paymentMethod.paymentName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Status
                </label>

                <select
                  defaultValue="PENDING"
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Payment Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                </select>
              </div>
            </div>

            {/* Button */}
            <div className="mt-8 flex justify-end">
              <button
                disabled={loadingButton}
                type="submit"
                className="w-full lg:w-auto rounded-lg bg-green-600 px-8 py-3 font-medium cursor-pointer text-white transition hover:bg-green-700"
              >
                {loadingButton ? (<Loader size={22} className="animate-spin" />) : ('Create Sale')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewSales;