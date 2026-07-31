import React, { useState, useEffect } from "react";
import useSalesStore from "../store/salesStore";
import useServiceStore from "../store/serviceStore";
import usePaymentStore from "../store/paymentStore";
import useUserStore from "../store/userStore";

const UpdateSaleModal = ({ id }) => {
    const [formData, setFormData] = useState({
        barberId: "",
        serviceId: "",
        paymentMethodId: "",
        paymentStatus: "",
    });

    const { sale, loading, error, getSaleById, updateSale } = useSalesStore();
    const { services, getAllServices } = useServiceStore();
    const { paymentMethods, getAllPaymentMethods } = usePaymentStore();
    const { users, getAllBarbersUsers } = useUserStore();

    useEffect(() => {
        if (sale) {
            setFormData({
                barberId: sale.barberId,
                serviceId: sale.ServiceId,
                paymentMethodId: sale.paymentMethodId,
                paymentStatus: sale.paymentStatus,
            });
        }
    }, [sale]);

    // Get services, Payment method and barber
    useEffect(() => {
        getAllServices()
        getAllPaymentMethods()
        getAllBarbersUsers()
    }, [])

  return (
    <form 
        className="space-y-6"

    //     onSubmit={(e) => {
    //         e.preventDefault();
    //         updateSale(id, formData);
    //     }
    // }
    >

      {/* Form Fields */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >   

        {/* Barber */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Barber
          </label>

          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            value={formData.barberId}
            onChange={(e) => setFormData({ ...formData, barberId: e.target.value })}
          >
            {/* <option>Select Barber</option>
            <option>John Doe</option>
            <option>Martin</option> */}

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
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            value={formData.serviceId}
            onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
          >
            {/* <option value="">Select Service</option>
            <option value="1">Hair Cut</option>
            <option value="2">Beard</option> */}

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
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            value={formData.paymentMethodId}
            onChange={(e) => setFormData({ ...formData, paymentMethodId: e.target.value })}
          >
            {/* <option>Select Payment Method</option>
            <option>Cash</option>
            <option>Mobile Money</option>
            <option>Card</option> */}

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
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          >
            <option>Select Status</option>
            <option>PAID</option>
            <option>PENDING</option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-gray-200 pt-6">

        <button
          type="button"
          className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white transition hover:bg-green-700 cursor-pointer"
        >
          Update Sale
        </button>

      </div>

    </form>
  );
};

export default UpdateSaleModal;