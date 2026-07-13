import React from 'react'
import SideBar from './SideBar'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-green-50'>
        <SideBar />

        <div className='w-full'>
          <Header />

          <main className='p-[2%] flex flex-1 flex-col min-h-svh'>{children}</main>
        </div>
    </div>
  )
}

export default Layout