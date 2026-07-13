import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaJediOrder } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

const SideBar = () => {
  
  const navItems = [
    { label: 'Dashboard', link: '/', icon: <MdDashboardCustomize /> },
    { label: 'Users', link: '/Users' , icon: <MdOutlineProductionQuantityLimits /> },
    { label: 'Services', link: '/Services' , icon: <FaUserCheck /> },
    { label: 'Category', link: '/Category' , icon: <FaJediOrder /> },
    { label: 'New Sale', link: '/Sales' , icon: <IoMdSettings /> },
    { label: 'Settings', link: '/settings' , icon: <IoMdSettings /> },
  ];

  return (
    <aside className='h-screen w-20 md:w-72 border-r border-gray-200 sticky top-0 bg-white'>
      <div className='mt-16'>
        {navItems.map((item, index) => (
          <Link 
            key={index}
            to={item.link}
            className={`hover:text-black flex items-center gap-3 px-3 py-2 mb-2 hover:bg-green-50 rounded-lg transition-colors
              ${window.location.pathname === item.link ? 'bg-green-100 text-black' : 'text-gray-500'}`}
          >
            <div className='text-xl'>{item.icon}</div>
            <span className='font-medium hidden md:block'>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default SideBar;