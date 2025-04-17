//Trang danh mục sản phẩm

import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayVNDCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import productCategory from '../helpers/productCategory'

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    // Hàm kiểm tra và hiển thị giá
    const renderPrice = (price, sellingPrice) => {
        if (sellingPrice === 0) {
            return displayVNDCurrency(price);
        }
        return (
            <>
                <span className="line-through text-gray-500">
                    {displayVNDCurrency(price)}
                </span>
                <span className="ml-2 text-red-500 font-semibold">
                    {displayVNDCurrency(sellingPrice)}
                </span>
            </>
        );
    };

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>

           {

                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <Link to={"/product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>
                                        {productCategory.find(item => item.value === product?.category)?.label || "Không xác định"}
                                    </p>

                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>
                                            {renderPrice(product?.price, product?.sellingPrice)}
                                        </p>
                                    </div>
                                    
                                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Thêm vào giỏ hàng</button>
                                </div>
                            </Link>
                        )
                    })
                )
                
            }
        </div>
  )
}

export default VerticalCard