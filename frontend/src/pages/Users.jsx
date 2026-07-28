import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import useUserStore from "../store/userStore";
import UsersSkeleton from "../components/skeletons/UsersSkeleton";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";
import NoDataFound from "../components/NoDataFound";

const Users = () => {
  const [menuOpen, setMenuOpen] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");

  const {
    users,
    error,
    totalPages,
    loadingUsers,
    getAllUsers,
  } = useUserStore();

  useEffect(() => {
    getAllUsers(page, limit, role, search);
  }, [page, limit, role, search]);

  return (
    <Layout pageTitle="Users">
      <div className="space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold">Users</h1>
          <p className="text-gray-400 font-semibold">
            {users.length} Total Users
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4">

          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Filter */}
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-56 rounded-lg border border-gray-300 bg-white px-4 py-2"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="barber">Barber</option>
            <option value="Receptionist">Receptionist</option>
          </select>

        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl bg-white shadow">

          <table className="min-w-[850px] w-full border border-gray-100">

            <thead className="bg-green-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-center">Verified</th>
              </tr>
            </thead>

            <tbody>
              {loadingUsers ? (

                <tr>
                  <td colSpan={5}>
                    <UsersSkeleton />
                  </td>
                </tr>

              ) : error ? (

                <tr>
                  <td colSpan={5}>
                    <ErrorMessage message={error} />
                  </td>
                </tr>

              ) : users.length === 0 ? (

                <tr>
                  <td
                    colSpan={5}
                    className="py-16"
                  >
                    <NoDataFound
                      title="No user found"
                      message="Try changing your search or filters."
                    />
                  </td>
                </tr>

              ) : (

                users.map((user) => (

                  <tr
                    key={user.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {user.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.phone}
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        {user.role}
                      </span>
                    </td>

                    <td className="relative p-4 text-center">
                      <button
                        onClick={() =>
                          setMenuOpen(
                            menuOpen === user.id ? null : user.id
                          )
                        }
                      >
                        <FiMoreVertical size={20} />
                      </button>

                      {menuOpen === user.id && (
                        <div className="absolute right-10 top-12 z-50 w-40 rounded-lg border bg-white shadow-lg">

                          <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                            View Details
                          </button>

                          <button className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50">
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

          {/* Pagination */}
          {users.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}

        </div>

      </div>
    </Layout>
  );
};

export default Users;