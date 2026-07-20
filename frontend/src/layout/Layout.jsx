import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { useState } from 'react'

const Layout = ({ 
  children,
  pageTitle,
}) => {
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  return (
    <div className='min-h-screen bg-green-50'>
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className={`transition-all duration-300 ${
            sidebarOpen ? "md:ml-72" : "ml-0"
          }`}
        >
          <Header pageTitle={pageTitle} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className='pt-20 p-[2%] flex flex-1 flex-col min-h-svh'>{children}</main>
        </div>
    </div>
  )
}

export default Layout