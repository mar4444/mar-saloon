import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import useSalesStore from "../store/salesStore";
import Pagination from "../components/Pagination";
import SalesSkeleton from "../components/skeletons/SalesSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import NoDataFound from "../components/NoDataFound";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import Modal from "../components/Modal";
import ViewSalesModal from "../sales/ViewSalesModal";
import UpdateSaleModal from "../sales/UpdateSaleModal";
import ConfirmModal from "../components/ConfirmModal";
import { useToast } from "../context/ToastContext";

const SalesHistory = () => {
  const { 
    loading, 
    error, 
    sales, 
    loadingSales, 
    totalPages, 
    getAllSales, 
    updateSale, 
    deleteSale,
    loadingButton } = useSalesStore();

  const { showToast } = useToast();

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(9);
  const [service, setService] = useState("")
  const [barber, setBarber] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  const [tab, setTab] = useState("");

  const [menuOpen, setMenuOpen] = useState(null);

  const [selectedSale, setSelectedSale] = useState(null);

  const [viewModal, setViewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    getAllSales(page, limit, start, end, service, barber)
  }, [page, limit, start, end, service, barber]);

const handleToday = () => {
  const today = new Date().toISOString().split("T")[0];

  setStart(today);
  setEnd(today);
  setPage(1);

  console.log(today)
};

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

const openViewModal = (id) => {
    setViewModal(true)
    setSelectedSale(id);
    setMenuOpen(null);
  }

const updateSaleModal = (id) => {
  setUpdateModal(true)
  setSelectedSale(id);
  setMenuOpen(null);
}

// this function is used to update the sale and then refresh the sales list
const fetchSales = () => {
    getAllSales(page, limit, start, end, service, barber);
};

const deleteSaleModal = (id) => {
  setDeleteModal(true);
  setSelectedSale(id);
  setMenuOpen(null);
}

const handleDelete = async (productToDelete) => {

  const deleteProduct = await deleteSale(productToDelete);

  if (deleteProduct.success) {
    setDeleteModal(false);
    showToast(deleteProduct.message, "success");
    fetchSales();
  } else {
    showToast(deleteProduct.message, "error");
  }
}

  return (
    <Layout pageTitle="Sales History">
      <div className="space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold">
            Sales History
          </h2>

          <p className="text-gray-400 font-semibold">{sales.length}</p>
        </div>

        {/* Filters */}
        <div className="">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Search */}
            <div>
              <input
                type="text"
                value={barber}
                onChange={(e) => {
                  setBarber(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by barber..."
                className="w-full border border-gray-300 rounded-md px-4 py-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date Filter */}
            <div className="">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {/* Service */}
                <div className="">
                    <select 
                      value={service}
                      onChange={(e) => {
                        setService(e.target.value);
                        setPage(1);
                      }}
                      className="w-full border border-gray-100 bg-white rounded-md px-4 py-1 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All Services</option>
                        <option value="Hair Cut">Hair Cut</option>
                        <option value="Beard">Beard</option>
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
                  <th className="p-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loadingSales ? (
                  <tr>
                    <td colSpan={6}>
                      <SalesSkeleton rows={2} />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                  <td colSpan={6}>
                    <ErrorMessage message={error} />
                  </td>
                </tr>
                ) : sales.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-16"
                    >
                      <NoDataFound
                        title="No Sale found"
                        message="Try changing your search or filters."
                      />
                    </td>
                </tr>

                ) : (
                  sales.map((sale) => (
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

                    <td className="relative p-4 text-center">
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          setMenuOpen(
                            menuOpen === sale.id ? null : sale.id
                          )
                        }
                      >
                        <FiMoreVertical size={20} />
                      </button>

                      {menuOpen === sale.id && (
                        <div className="absolute right-10 top-12 z-50 w-40 rounded-lg border bg-white shadow-lg">

                          <button 
                            onClick={() => {
                              openViewModal(sale.id)
                            }}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                          >
                            View Details
                          </button>

                          <button 
                            onClick={() => {
                              updateSaleModal(sale.id)
                            }}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                          >
                            Update
                          </button>

                          <button 
                            onClick={() => {
                              deleteSaleModal(sale.id)
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

          {/* Pagination */}
          {sales.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>

        {viewModal && selectedSale && (
          <Modal 
            isOpen={viewModal} 
            title="Sale Details" 
            onClose={() =>setViewModal(false)}
          >
            <ViewSalesModal id={selectedSale} />
          </Modal>
          
        )}

        {updateModal && selectedSale && (
          <Modal 
            isOpen={updateModal} 
            title="Update Sale" 
            onClose={() =>setUpdateModal(false)}
          >
            {/* <ViewSalesModal id={selectedSale} /> */}
            <UpdateSaleModal
              id={selectedSale}
              onClose={() => setUpdateModal(false)}
              refreshSales={fetchSales}
            />
          </Modal>
        )}

        {deleteModal && selectedSale && (
          <ConfirmModal 
            isOpen={deleteModal} 
            productToDelete={selectedSale}
            onConfirm={handleDelete}
            onCancel={() => setDeleteModal(false)}
            loading={loadingButton}
            message="Are you sure you want to delete Sale? This action cannot be undone."
            confirmText="Delete"
          />
        )}

      </div>
    </Layout>
  );
};

export default SalesHistory;