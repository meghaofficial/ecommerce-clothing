import React from 'react'

const Contact = () => {
  return (
    <div className='mt-16'>
      <div className='w-full flex items-center justify-center py-10'>
            <img src="https://demo2.wpopal.com/frido/wp-content/uploads/2018/07/img_contact.jpg" alt="shop" className='w-[90%]' />
      </div>
      <div>
            <div className='border-b border-b-gray-300 px-[250px] py-[100px] flex items-start justify-between'>
                  <div className='flex flex-col'>
                        <span className='text-gray-500 text-[0.9em] tracking-widest font-[400]'>SHOP</span>
                        <span className='text-[25px]'>Dubai</span>
                  </div>
                  <div>
                        <p className='text-[0.9em]'>
                              <span className='font-semibold'>Address: </span>
                              <span className='text-gray-600 font-[400]'>Robert Bosch Street, 1765 Gate 10, London,
                              United Kingom</span>
                        </p>
                        <p className='my-5'>
                              <span className='font-semibold'>Phone: </span>
                              <span className='text-gray-600 font-[400]'>+01 234 567 899</span>
                        </p>
                        <p>
                              <span className='font-semibold'>Mail: </span>
                              <span className='text-gray-600 font-[400]'>Fila@support.com</span>
                        </p>
                  </div>
            </div>
      </div>
    </div>
  )
}

export default Contact
