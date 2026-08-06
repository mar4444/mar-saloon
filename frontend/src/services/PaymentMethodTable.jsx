import { MoreHorizontal, Plus } from "lucide-react";
import usePaymentStore from "../store/paymentStore";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import ServiceSkeleton from "../components/skeletons/ServiceSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import NoDataFound from "../components/NoDataFound";
import Modal from "../components/Modal";
import EditPaymentModal from "../paymentModals/EditPaymentModal";
import ViewPaymentDetails from "../paymentModals/ViewPaymentDetails";
import AddPaymentModal from "../paymentModals/AddPaymentModal";
import ConfirmModal from "../components/ConfirmModal";

const PaymentMethodTable = () => {
  const { loadingPaymentMethods, error, paymentMethods, getAllPaymentMethods, deletePaymentMethod, loadingButton } = usePaymentStore();
  const { showToast } = useToast();

  const [menuOpen, setMenuOpen] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [editModal, setEditModal] = useState(null)
  const [addModal, setAddModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)

  useEffect(() => {
    getAllPaymentMethods();
  }, []);

  const openViewModal = (id) => {
    setViewModal(true);
    setMenuOpen(false);
    setSelectedPayment(id);
  }

  const openEditModal = (id) => {
    setEditModal(true)
    setMenuOpen(false);
    setSelectedPayment(id);
  }

  const openAddModal = () => {
    setAddModal(true)
  }

  const openDeleteModal = (id) => {
    setDeleteModal(true);
    setMenuOpen(false);
    setSelectedPayment(id);
  }

  const handleDelete = async (paymentToDelete) => {

  const deletePaymentHere = await deletePaymentMethod(paymentToDelete);

  if (deletePaymentHere.success) {
    setDeleteModal(false);
    showToast(deletePaymentHere.message, "success");
    getAllPaymentMethods();
  } else {
    showToast(deletePaymentHere.message, "error");
  }
}

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">Payment Methods</h1>
        <p className="text-gray-400 font-semibold">2 Total Payment Methods</p>
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
          <Plus size={18}/>
          Add Payment Method
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="bg-white min-w-[650px] max-w-[400px] border border-gray-200">
          <thead className="bg-green-50">
            <tr className="text-left text-gray-400 text-sm">
              <th className="p-3">
                Payment Name
              </th>
              <th className="text-center p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loadingPaymentMethods ? (
              <tr>
                <td colSpan={3}>
                  <ServiceSkeleton rows={2} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6}>
                  <ErrorMessage message={error} />
                </td>
              </tr>
            ) : paymentMethods.length === 0 ? (
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
              paymentMethods.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">
                  {payment.paymentName}
                </td>
                <td className="relative p-3 text-center">
                  {/* <button className="cursor-pointer">
                    <MoreHorizontal size={18} />
                  </button> */}

                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setMenuOpen(
                        menuOpen === payment.id ? null : payment.id
                      )
                    }
                  >
                    <MoreHorizontal size={18} />
                  </button>
                   
                   {menuOpen === payment.id && (
                    <div className="absolute right-10 top-12 z-50 w-40 rounded-lg border bg-white shadow-lg">

                      <button 
                        onClick={() => {
                          openViewModal(payment.id)
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      >
                        View Details
                      </button>

                      <button 
                        onClick={() => {
                          openEditModal(payment.id)
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      >
                        Update
                      </button>

                      <button 
                        onClick={() => {
                          openDeleteModal(payment.id)
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

      
      {viewModal && selectedPayment && (
        <Modal
          isOpen={viewModal} 
          title="Payment status Details" 
          onClose={() =>setViewModal(false)}
        >
          <ViewPaymentDetails selectedPayment={selectedPayment} />
        </Modal>
      )}

      {editModal && selectedPayment && (
        <Modal
          isOpen={editModal} 
          title="Update Payment status." 
          onClose={() =>setEditModal(false)}
        >
          <EditPaymentModal selectedPayment={selectedPayment} onClose={() => setEditModal(false)} />
        </Modal>
      )}

      {addModal && (
        <Modal
          isOpen={addModal} 
          title="Add New Payment Status" 
          onClose={() =>setAddModal(false)}
        >
          <AddPaymentModal onClose={() => setAddModal(false)} />
        </Modal>
      )}

      {deleteModal && (
        <ConfirmModal 
          isOpen={deleteModal}
          message="Are you sure you want to delete Payment status? This action cannot be undone."
          onCancel={() => setDeleteModal(false)}
          loading={loadingButton}
          confirmText="Delete"
          onConfirm={handleDelete}
          productToDelete={selectedPayment}
        />
      )}
    </div>
  );
};

export default PaymentMethodTable;