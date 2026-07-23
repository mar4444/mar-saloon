import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUserCheck, FaHistory  } from "react-icons/fa";
import { FaJediOrder } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FcSalesPerformance } from "react-icons/fc";

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  
  const navItems = [
    { label: 'Dashboard', link: '/dashboard', icon: <MdDashboardCustomize /> },
    { label: 'Users', link: '/users' , icon: <MdOutlineProductionQuantityLimits /> },
    { label: 'Features', link: '/features' , icon: <FaUserCheck /> },
    { label: 'New Sale', link: '/new-sales' , icon: <FcSalesPerformance /> },
    { label: 'Sales History', link: '/sales-history' , icon: <FaHistory /> },
    { label: 'Settings', link: '/setting' , icon: <IoMdSettings /> },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <aside 
      className={`
        fixed
        top-0
        left-0
        h-screen
        px-3
        w-56
        bg-white
        border-r
        border-gray-200
        transition-transform
        duration-300
        z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className='mt-16'>
        {navItems.map((item, index) => (
          <Link 
            key={index}
            to={item.link}
            className={`hover:text-black flex items-center gap-3 px-3 py-2 mb-2 hover:bg-green-50 rounded-lg transition-colors
              ${window.location.pathname === item.link ? 'bg-green-100 text-black' : 'text-gray-500'}`}
          >
            <div className='text-xl'>{item.icon}</div>
            <span className='font-medium'>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
    </>
    
  )
}

export default SideBar;