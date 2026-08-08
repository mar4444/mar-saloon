import React, { useEffect, useState } from 'react'
import useServiceStore from "../store/serviceStore";
import { useToast } from "../context/ToastContext";
import {
  Loader
} from "lucide-react";

const AddServiceModal = ({ selectedService, onClose }) => {
    const { error, loadingButton, addService, getAllServices } = useServiceStore();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        serviceName: "",
        price: "",
    });

    const handleAdd = async (e) => {
        e.preventDefault();

        const addNewService = await addService(formData);

        if (addNewService.success) {
            onClose();
            showToast(addNewService.message, "success");
            getAllServices();
        } else {
            showToast(addNewService.message, "error");
        }
    }

  return (
    <div className='space-y-3'>
        <div className='py-2'>
            <h1 className='font-semibold'>Add Service</h1>
            <p className='text-sm text-gray-500'>Add new service.</p>
        </div>

        <div>
            <form 
                className='space-y-4'
                onSubmit={handleAdd}
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <input 
                        required
                        type="text" 
                        value={formData.serviceName}
                        onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                        placeholder='Enter Service Name'
                        className='w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200'
                    />
                    <input 
                        required
                        type="text" 
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder='Enter Price'
                        className='w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200'
                    />
                </div>
                <div className='flex items-center justify-end'>
                    <button 
                        disabled={loadingButton}
                        type="submit"
                        className='rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white transition hover:bg-green-700 cursor-pointer'
                    >
                        {loadingButton ? (<Loader size={22} className="animate-spin" />) : ('Add')}
                </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddServiceModal