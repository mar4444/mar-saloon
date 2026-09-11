import React, { useEffect, useState } from 'react'
import usePaymentStore from "../store/paymentStore";
import { useToast } from "../context/ToastContext";
import {
  Loader
} from "lucide-react";

const EditPaymentModal = ({ selectedPayment, onClose }) => {
    const { paymentMethod, erroModal, getPaymentMethodById, loadingButton, updatePaymentMethod, getAllPaymentMethods } = usePaymentStore();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        paymentName: "",
    })

    useEffect(() => {
        if (paymentMethod?.id) {
            setFormData({
                paymentName: paymentMethod.paymentName ?? "",
            })
        }
    }, [paymentMethod])

    useEffect(() => {
        getPaymentMethodById(selectedPayment)
    }, [selectedPayment])

    const handleEdit = async (e) => {
        e.preventDefault();

        const editPayment = await updatePaymentMethod(selectedPayment, formData);

        if (editPayment.success) {
            onClose();
            showToast(editPayment.message, "success");
            getAllPaymentMethods();
        } else {
            showToast(editPayment.message, "error");
        }
    }

  return (
    <div className='space-y-3'>
        <div className='py-2'>
            <h1 className='font-semibold'>Edit Payment status</h1>
            <p className='text-sm text-gray-500'>Edit status of this completed payment.</p>
        </div>

        <div>
            <form 
                className='space-y-4'
                onSubmit={handleEdit}
            >
                <div className='grid'>
                    <input 
                        type="text" 
                        value={formData.paymentName}
                        onChange={(e) => setFormData({ ...formData, paymentName: e.target.value })}
                        placeholder='Enter Payment status Name'
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

export default EditPaymentModal