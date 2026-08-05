import React, { useEffect } from 'react'
import useServiceStore from "../store/serviceStore";
import ErrorMessage from '../components/ErrorMessage';
import NoDataFound from '../components/NoDataFound';

const ViewServiceDetails = ({ selectedService }) => {
    const { service, error, loadingUpdate, getServiceById } = useServiceStore();

    useEffect(() => {
        getServiceById(selectedService)
    }, []);

  return (
    <div className='space-y-4'>
        {loadingUpdate && <div className='py-2 grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse'>
            <div className='bg-gray-200 py-10 rounded-md'></div>
            <div className='bg-gray-200 py-10 rounded-md'></div>
            <div className='bg-gray-200 py-10 rounded-md'></div>
            <div className='bg-gray-200 py-10 rounded-md'></div>
          </div>
        }

        {!loadingUpdate && error && <p><ErrorMessage /></p>}

        {!loadingUpdate && !error && !service && <NoDataFound />}

        {!loadingUpdate && !error && service && 
            <>
                <div className='border-b border-gray-200 py-2'>
                    <h1 className='font-semibold'>Service Info</h1>
                    <p className='text-sm text-gray-500'>View details of this completed service.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-3'>
                    <div className='bg-green-50 rounded-lg p-4 space-y-1.5'>
                        <p className='text-gray-500'>Service Name</p>
                        <h1 className='text-lg font-semibold'>{service.serviceName}</h1>
                    </div>

                    <div className='bg-green-50 rounded-lg p-4 space-y-1.5'>
                        <p className='text-gray-500'>Price</p>
                        <h1 className='text-lg font-semibold'>{service.price}</h1>
                    </div>

                    <div className='bg-green-50 rounded-lg p-4 space-y-1.5'>
                        <p className='text-gray-500'>Date</p>
                        <h1 className='text-lg font-semibold'>{new Date(service.createdAt).toLocaleDateString()}</h1>
                    </div>
                </div>
            </>
        }
    </div>
  )
}

export default ViewServiceDetails