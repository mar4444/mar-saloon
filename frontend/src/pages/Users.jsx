// import React, { useEffect, useState } from 'react'
// import Layout from '../layout/Layout'
// import api from '../utils/api.js'

// const Users = () => {
//   return (
//     <Layout pageTitle="Users">
      
//     </Layout>
//   )
// }

// export default Users

import React, { useState } from "react";
import Layout from "../layout/Layout";
import { FiMoreVertical, FiSearch } from "react-icons/fi";

const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    phone: "0788000001",
    role: "Admin",
    verified: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@gmail.com",
    phone: "0788000002",
    role: "Receptionist",
    verified: false,
  },
  {
    id: 3,
    name: "Martin",
    email: "martin@gmail.com",
    phone: "0788000003",
    role: "Barber",
    verified: true,
  },
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);

  const filteredUsers = dummyUsers.filter((user) => {
    const matchSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchRole = role === "" || user.role === role;

    return matchSearch && matchRole;
  });

  return (
    <Layout pageTitle="Users">
      <div className="border border-red-500 space-y-6">

        {/* Filters */}
        <div className="border border-yellow-500 flex flex-col md:flex-row gap-4 justify-between">

          {/* Search */}
          <div className="border border-green-500 relative w-full md:max-w-sm">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search by name..."
              className="w-full rounded-lg border pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Role Filter */}
          <select
            className="border rounded-lg px-4 py-2 w-full md:w-56"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option>Admin</option>
            <option>Barber</option>
            <option>Receptionist</option>
          </select>
        </div>

        {/* Desktop Table */}
        <div className="border border-blue-500 hidden md:block bg-white rounded-xl shadow overflow-scroll">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-center">Verified</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">{user.name}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">{user.phone}</td>

                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4 text-center relative">
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
                      <div className="absolute right-10 top-12 w-40 bg-white shadow-lg rounded-lg border z-50">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          View Details
                        </button>

                        <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow p-4 relative"
            >
              <div className="absolute right-4 top-4">
                <button
                  onClick={() =>
                    setMenuOpen(
                      menuOpen === user.id ? null : user.id
                    )
                  }
                >
                  <FiMoreVertical />
                </button>

                {menuOpen === user.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      View Details
                    </button>

                    <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <h2 className="font-semibold text-lg">
                {user.name}
              </h2>

              <p className="text-gray-500">{user.email}</p>

              <p className="mt-2">{user.phone}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {user.role}
                </span>

                <span
                  className={`text-sm font-medium ${
                    user.verified
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {user.verified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No users found.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Users;