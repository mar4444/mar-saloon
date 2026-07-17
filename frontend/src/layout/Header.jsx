import React from 'react';
import { MdAccountCircle } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";

const Header = ({ pageTitle }) => {
    return (
        <header className='w-full bg-white sticky top-0 z-50 shadow-sm p-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1>{ pageTitle }</h1>
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
