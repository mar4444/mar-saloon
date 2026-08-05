import { MoreHorizontal, Plus } from "lucide-react";
import useServiceStore from "../store/serviceStore";
import { useEffect, useState } from "react";
import ServiceSkeleton from "../components/skeletons/ServiceSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import NoDataFound from "../components/NoDataFound";
import Modal from "../components/Modal";
import ViewServiceDetails from "../serviceModals/ViewServiceDetails";
import EditServiceModal from "../serviceModals/EditServiceModal";
import AddServiceModal from "../serviceModals/AddServiceModal";
import ConfirmModal from "../components/ConfirmModal";
import { useToast } from "../context/ToastContext";

const ServiceTable = () => {
  const { services, error, getAllServices, loadingServices, loadingButton, deleteService } = useServiceStore();
  const { showToast } = useToast();

  const [menuOpen, setMenuOpen] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null)
  const [editModal, setEditModal] = useState(null)
  const [addModal, setAddModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)

  useEffect(() => {
    getAllServices();
  }, []);

  const openViewModal = (id) => {
    setViewModal(true);
    setMenuOpen(false);
    setSelectedService(id);
  }

  const openEditModal = (id) => {
    setEditModal(true)
    setMenuOpen(false);
    setSelectedService(id);
  }

  const openAddModal = () => {
    setAddModal(true)
  }

  const openDeleteModal = (id) => {
    setDeleteModal(true);
    setMenuOpen(false);
    setSelectedService(id);
  }

  const handleDelete = async (serviceToDelete) => {

  const deleteServiceHere = await deleteService(serviceToDelete);

  if (deleteServiceHere.success) {
    setDeleteModal(false);
    showToast(deleteServiceHere.message, "success");
    getAllServices();
  } else {
    showToast(deleteServiceHere.message, "error");
  }
}

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
          onClick={() => openAddModal()}
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
                  <ErrorMessage message={error} />
                </td>
              </tr>
            ) : services.length === 0 ? (
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
                          openViewModal(service.id)
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      >
                        View Details
                      </button>

                      <button 
                        onClick={() => {
                          openEditModal(service.id)
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      >
                        Update
                      </button>

                      <button 
                        onClick={() => {
                          openDeleteModal(service.id)
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
      
      {viewModal && selectedService && (
        <Modal
          isOpen={viewModal} 
          title="Service Details" 
          onClose={() =>setViewModal(false)}
        >
          <ViewServiceDetails selectedService={selectedService} />
        </Modal>
      )}

      {editModal && selectedService && (
        <Modal
          isOpen={editModal} 
          title="Update Service" 
          onClose={() =>setEditModal(false)}
        >
          <EditServiceModal selectedService={selectedService} onClose={() => setEditModal(false)} />
        </Modal>
      )}

      {addModal && (
        <Modal
          isOpen={addModal} 
          title="Add New Service" 
          onClose={() =>setAddModal(false)}
        >
          <AddServiceModal onClose={() => setAddModal(false)} />
        </Modal>
      )}

      {deleteModal && (
        <ConfirmModal 
          isOpen={deleteModal}
          message="Are you sure you want to delete Service? This action cannot be undone."
          onCancel={() => setDeleteModal(false)}
          loading={loadingButton}
          confirmText="Delete"
          onConfirm={handleDelete}
          productToDelete={selectedService}
        />
      )}
    </div>
  );
};

export default ServiceTable;