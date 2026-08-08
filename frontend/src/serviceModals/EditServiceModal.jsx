import React, { useEffect, useState } from 'react'
import useServiceStore from "../store/serviceStore";
import { useToast } from "../context/ToastContext";
import {
  Loader
} from "lucide-react";

const EditServiceModal = ({ selectedService, onClose }) => {
    const { service, error, getServiceById, loadingButton, updateService, getAllServices } = useServiceStore();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        serviceName: "",
        price: "",
    })

    useEffect(() => {
        if (service?.id) {
            setFormData({
                serviceName: service.serviceName ?? "",
                price: service.price ?? "",
            })
        }
    }, [service])

    useEffect(() => {
        getServiceById(selectedService)
    }, [selectedService])

    const handleEdit = async (e) => {
        e.preventDefault();

        const editService = await updateService(selectedService, formData);

        if (editService.success) {
            onClose();
            showToast(editService.message, "success");
            getAllServices();
        } else {
            showToast(editService.message, "error");
        }
    }

  return (
    <div className='space-y-3'>
        <div className='py-2'>
            <h1 className='font-semibold'>Edit Service</h1>
            <p className='text-sm text-gray-500'>Edit service of this completed service.</p>
        </div>

        <div>
            <form 
                className='space-y-4'
                onSubmit={handleEdit}
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <input 
                        type="text" 
                        value={formData.serviceName}
                        onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                        placeholder='Enter Service Name'
                        className='w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200'
                    />
                    <input 
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
                        {loadingButton ? (<Loader size={22} className="animate-spin" />) : ('Update')}
                </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditServiceModal