import React, { useEffect } from 'react'
import usePaymentStore from "../store/paymentStore";
import ErrorMessage from '../components/ErrorMessage';
import NoDataFound from '../components/NoDataFound';

const ViewPaymentDetails = ({ selectedPayment }) => {
    const { loadingModal, paymentMethod, erroModal, getPaymentMethodById } = usePaymentStore();

    useEffect(() => {
        getPaymentMethodById(selectedPayment)
    }, []);

  return (
    <div className='space-y-4'>
        {loadingModal && <div className='py-2 grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse'>
            <div className='bg-gray-200 py-10 rounded-md'></div>
            <div className='bg-gray-200 py-10 rounded-md'></div>
          </div>
        }

        {!loadingModal && erroModal && <p><ErrorMessage /></p>}

        {!loadingModal && !erroModal && !paymentMethod && <NoDataFound />}

        {!loadingModal && !erroModal && paymentMethod && 
            <>
                <div className='border-b border-gray-200 py-2'>
                    <h1 className='font-semibold'>Payment status Info</h1>
                    <p className='text-sm text-gray-500'>View details of this completed Payment status.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-3'>
                    <div className='bg-green-50 rounded-lg p-4 space-y-1.5'>
                        <p className='text-gray-500'>payment Method Name</p>
                        <h1 className='text-lg font-semibold'>{paymentMethod.paymentName}</h1>
                    </div>

                    <div className='bg-green-50 rounded-lg p-4 space-y-1.5'>
                        <p className='text-gray-500'>Date</p>
                        <h1 className='text-lg font-semibold'>{new Date(paymentMethod.createdAt).toLocaleDateString()}</h1>
                    </div>
                </div>
            </>
        }
    </div>
  )
}

export default ViewPaymentDetails