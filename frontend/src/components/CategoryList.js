//hiển thị sản phẩm hiện có ở trang chủ website

import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import productCategory from '../helpers/productCategory';

const CategoryList = () => {
    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4'>
            <div><Link to={"/product-category"}className="hover:text-blue-400">Danh mục sản phẩm hiện có</Link></div>
           <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            {

                loading ? (
                    categoryLoading.map((el,index)=>{
                            return(
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                </div>
                            )
                    })  
                ) :
                (
                    categoryProduct.map((product,index)=>{
                        return(
                            <Link to={"/product-category?category=" + product?.category} className="cursor-pointer" key={product?.category}>
                                <div className="flex flex-col items-center justify-center w-20">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                    <img
                                        src={product?.productImage[0]}
                                        alt={product?.category}
                                        className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                                    />
                                    </div>
                                    <div className="text-center text-sm mt-1 w-full truncate">
                                        {(productCategory.find(item => item.value === product?.category)?.label || "Không xác định").slice(0, 8) + '...'}  {/* slice để lấy số lượng chữ cái */}
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                )
            }
           </div>
    </div>
  )
}

export default CategoryList