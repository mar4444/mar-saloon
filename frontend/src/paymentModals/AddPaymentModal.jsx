import React, { useEffect, useState } from 'react'
import usePaymentStore from "../store/paymentStore";
import { useToast } from "../context/ToastContext";
import {
  Loader
} from "lucide-react";

const AddPaymentModal = ({ selectedPayment, onClose }) => {
    const { erroModal, loadingButton, createPaymentMethod, getAllPaymentMethods } = usePaymentStore();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        paymentName: "",
    });

    const handleAdd = async (e) => {
        e.preventDefault();

        const addNewPayment = await createPaymentMethod(formData);

        if (addNewPayment.success) {
            onClose();
            showToast(addNewPayment.message, "success");
            getAllPaymentMethods();
        } else {
            showToast(addNewPayment.message, "error");
        }
    }

  return (
    <div className='space-y-6'>
        <div className='border-b border-gray-200 py-2'>
            <h1 className='font-semibold'>Add Payment Status</h1>
            <p className='text-sm text-gray-500'>Add new Payment status.</p>
        </div>

        <div>
            <form 
                className='space-y-4'
                onSubmit={handleAdd}
            >
                <div className='grid'>
                    <input 
                        required
                        type="text" 
                        value={formData.paymentName}
                        onChange={(e) => setFormData({ ...formData, paymentName: e.target.value })}
                        placeholder='Enter Payment Status Name'
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

export default AddPaymentModal