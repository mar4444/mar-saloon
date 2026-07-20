import React from 'react';
import { MdAccountCircle } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";

const Header = ({ pageTitle, sidebarOpen, setSidebarOpen }) => {
    return (
        <header className={`
            fixed
            top-0
            right-0
            bg-white
            shadow-sm
            p-4
            transition-all
            duration-300
            z-30
            ${
            sidebarOpen
                ? "md:left-72 left-0"
                : "left-0"
            }
        `}
        >
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-2xl text-green-600 cursor-pointer"
                    >
                        <HiOutlineMenu />
                    </button>

                    <h1 className="text-xl font-semibold">
                        {pageTitle}
                    </h1>
                </div>

                <div className='flex items-center justify-center gap-6'>
                    <LuSettings className='text-green-500 cursor-pointer text-xl' />
                    <IoNotifications className='text-green-500 cursor-pointer text-xl' />
                    <MdAccountCircle className='text-green-500 cursor-pointer text-3xl' />
                </div>
            </div>
        </header>
    )
}

export default Header;
