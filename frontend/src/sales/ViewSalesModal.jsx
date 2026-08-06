import React, { useEffect } from 'react'
import useSalesStore from "../store/salesStore";
import ErrorMessage from '../components/ErrorMessage';
import NoDataFound from '../components/NoDataFound';

const ViewSalesModal = ({ id }) => {
//   if (!sale) return null;
const { sale, loading, error, getSaleById } = useSalesStore();

useEffect(() => {
    getSaleById(id)
}, [id])

  return (
    <div className="space-y-6">
      {loading && 
      <div className='py-2 grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse'>
        <div className='bg-gray-200 py-10 rounded-md'></div>
        <div className='bg-gray-200 py-10 rounded-md'></div>
        <div className='bg-gray-200 py-10 rounded-md'></div>
        <div className='bg-gray-200 py-10 rounded-md'></div>
      </div>
      }
      {!loading && error && <p><ErrorMessage /></p>}

      {!loading && !error && !sale && <NoDataFound />}

      {!loading && !error && sale && 
        <>
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Sale Information
              </h3>

              <p className="text-sm text-gray-500">
                View details of this completed sale.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                sale.paymentStatus === "PAID"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {sale.paymentStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <DetailCard
              label="Amount Paid"
              value={`$${sale.amountPaid}`}
            />

            <DetailCard
              label="Payment Method"
              value={sale.Payment?.paymentName}
            />

            <DetailCard
              label="Barber"
              value={sale.barber?.name}
            />

            <DetailCard
              label="Service"
              value={sale.Service?.serviceName}
            />

            <DetailCard
              label="Date"
              value={new Date(sale.createdAt).toLocaleDateString()}
            />

            <DetailCard
              label="Time"
              value={new Date(sale.createdAt).toLocaleTimeString()}
            />

          </div>
        </>
      }

      {/* Details */}
      
    </div>
  );
};

const DetailCard = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-green-50 p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-base font-semibold text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
};

export default ViewSalesModal;