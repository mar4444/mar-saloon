import React from 'react'
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex gap-1 justify-end py-2 text-gray-800">
        <div className='py-2 px-4'>
            <button
                disabled={page===1}
                onClick={()=>onPageChange(page-1)}
                className="px-3 py-1 hover:bg-blue-50 rounded-full border border-gray-300 cursor-pointer"
            >
                <GrFormPrevious />
            </button>

            {/* {
                [...Array(totalPages)].map((_,index)=>(
                    <button
                        key={index}
                        onClick={()=>onPageChange(index+1)}
                        className={`px-3 py-1 rounded cursor-pointer hover:bg-blue-50 ${page===index+1 ? "bg-blue-500 hover:bg-blue-500 text-white" : ""}`}
                    >
                        {index+1}
                    </button>
                ))
            } */}

            <span className='px-3 py-1'>
                {page} / {totalPages}
            </span>

            <button
                disabled={page===totalPages}
                onClick={()=>onPageChange(page+1)}
                className="px-3 py-1 hover:bg-blue-50 rounded-full border border-gray-300 cursor-pointer"
            >
                <MdOutlineNavigateNext />
            </button>
        </div>
        
    </div>
  )
}

export default Pagination