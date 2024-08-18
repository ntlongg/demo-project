import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import AdminDeleteProduct from './AdminDeleteProduct';
import { MdDelete } from "react-icons/md";

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct,setEditProduct] = useState(false)
    const [openDeleteProduct,setOpenDeleteProduct]  = useState(false)

  return (
    <div className=' bg-slate-200 p-4 rounded-lg mt-10    '>
       <div className='w-40  '>
            <div className='w-32 h-32 flex justify-center items-center  '>
              <img src={data?.productImage[0]}  className='object-scale-down w-full h-full object-cover'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
            
            <div>

                <p className='font-semibold'>
                  {
                    displayINRCurrency(data.price)
                  }
        
                </p>
                <div className='flex justify-between'>
                  <div className=' w-fit ml-auto p-2 bg-green-200 hover:bg-green-500 hover:text-white rounded-full cursor-pointer' onClick={()=>setEditProduct(true)}>
                      <MdModeEditOutline/>
                  </div>
                  <div className='w-fit ml-auto p-2 bg-red-200 hover:bg-red-500 hover:text-white rounded-full cursor-pointer' onClick={()=>setOpenDeleteProduct(true)}>
                      <MdDelete/>
                  </div>
                </div>

            </div>

          
       </div>
        
        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
          )
        }
        {
          openDeleteProduct && (
            <AdminDeleteProduct productData={data} onClose={()=>setOpenDeleteProduct(false)} fetchdata={fetchdata}/>
          )
        }
    
    </div>
  )
}

export default AdminProductCard