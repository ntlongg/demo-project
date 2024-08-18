import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { CgClose } from "react-icons/cg";
import DisplayImage from './DisplayImage';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminDeleteProduct = ({
  onClose,
  productData,
  fetchdata
}) => {
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [data] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
    status: productData?.status
  });

  const handleDelete = async (e) => {
    e.preventDefault();

    // Confirmation before deletion
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${data.productName}" này không?`)) {
      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchdata();
      }

      if (responseData.error) {
        toast.error(responseData?.message);
      }
    } else {
      // User cancels deletion
      console.log('Deletion cancelled');
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm '>

        <button className='block ml-auto' onClick={onClose}>
          <CgClose />
        </button>

        <h1 className='pb-4 text-lg font-medium'>Quản lý sản phẩm</h1>
        <div className='m-5'>
          <p>Tên sản phẩm: {productData?.productName}</p>
          <p>Mã sản phẩm: {productData?.brandName}</p>
          <p>Loại sản phẩm: {productData?.category}</p>
          <p>Ảnh sản phẩm: {
            data?.productImage[0] ? (
              <div className='flex items-center gap-2'>
                {
                  data.productImage.map((el) => {
                    return (
                      <div className='relative group'>
                        <img
                          src={el}
                          alt={el}
                          width={80}
                          height={80}
                          className='bg-slate-100 border cursor-pointer'
                          onClick={() => {
                            setOpenFullScreenImage(true);
                            setFullScreenImage(el);
                          }}
                        />
                      </div>
                    );
                  })
                }
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Vui lòng tải ảnh sản phẩm lên</p>
            )
          }</p>
          <p className='font-semibold'>Giá: {displayINRCurrency(data.price)}</p>
          <p>Trạng thái: {data.status}</p>

          <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </div>
      {/***display image full screen */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )
      }
    </div>
  );
};

export default AdminDeleteProduct;
