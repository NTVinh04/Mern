import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
import productCategory from '../helpers/productCategory'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])
  const [selectCategory, setSelectCategory] = useState({})
  const [filteredProduct, setFilteredProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked
    }))
  }

  useEffect(() => {
    const selectedCategories = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    )

    if (selectedCategories.length === 0) {
      setFilteredProduct(allProduct)
    } else {
      const filtered = allProduct.filter((product) =>
        selectedCategories.includes(product.category)
      )
      setFilteredProduct(filtered)
    }
  }, [selectCategory, allProduct])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Tất cả sản phẩm</h2>
        <button
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Thêm Sản Phẩm
        </button>
      </div>

      {/** Filter by category */}
      <div className='bg-white p-4 flex gap-4 flex-wrap'>
        {productCategory.map((category) => (
          <label key={category.value} className='flex items-center gap-2'>
            <input
              type='checkbox'
              value={category.value}
              checked={!!selectCategory[category.value]}
              onChange={handleSelectCategory}
            />
            {category.label}
          </label>
        ))}
      </div>

      {/** All filtered products */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-250px)] overflow-y-scroll px-4'>
        {filteredProduct.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + 'filteredProduct'}
            fetchdata={fetchAllProduct}
          />
        ))}
      </div>

      {/** Upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  )
}

export default AllProducts
