import { MoreHorizontal, Plus } from "lucide-react";
import useServiceStore from "../store/serviceStore";
import { useEffect, useState } from "react";
import ServiceSkeleton from "../components/skeletons/ServiceSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import NoDataFound from "../components/NoDataFound";

const ServiceTable = () => {
  const { services, error, getAllServices, loadingServices } = useServiceStore();

  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">Services</h1>
        <p className="text-gray-400 font-semibold">2 Total Services</p>
      </div>

      <div className="">
        <button
          className="flex items-center gap-2
          bg-green-600
          hover:bg-green-700
          text-white
          rounded-md
          px-4
          py-2
          cursor-pointer"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="bg-white min-w-[650px] max-w-[400px] border border-gray-200">
          <thead className="bg-green-50">
            <tr className="text-left text-gray-400 text-sm">
              <th className="p-3">Service Name</th>
              <th className="p-3">Price</th>
              <th className="text-center p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loadingServices ? (
              <tr>
                <td colSpan={3}>
                  {/* <SalesSkeleton rows={2} /> */}
                  <ServiceSkeleton rows={2} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6}>
                  <SalesSkeleton rows={2} />
                  <ErrorMessage message={error} />
                </td>
              </tr>
            ) : services.lenght === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-16"
                >
                  <NoDataFound
                    title="No Service found"
                    message="Try changing your search or filters."
                  />
                </td>
              </tr>
            ) : (
              services.map((service) => (
              <tr
                key={service.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">{service.serviceName}</td>
                <td className="p-3">{service.price} Frw</td>
                <td className="relative p-3 text-center">
                  {/* <button className="cursor-pointer">
                    <MoreHorizontal size={18} />
                  </button> */}

                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setMenuOpen(
                        menuOpen === service.id ? null : service.id
                      )
                    }
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {menuOpen === service.id && (
                    <div className="absolute right-10 top-12 z-50 w-40 rounded-lg border bg-white shadow-lg">

                      <button 
                        onClick={() => {
                          // openViewModal(service.id)
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      >
                        View Details
                      </button>

                      <button 
                        onClick={() => {
                          // updateSaleModal(sale.id)
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      >
                        Update
                      </button>

                      <button 
                        onClick={() => {
                          // deleteSaleModal(sale.id)
                        }}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>

            ))
            )}

            
            
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default ServiceTable;