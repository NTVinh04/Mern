//xóa sản phẩm khỏi danh sách sản phẩm của admin
import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from 'react-icons/fa'; // Thêm icon xoá
import AdminEditProduct from './AdminEditProduct';
import displayVNDCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common'; // Đảm bảo import đúng file chứa API
import { toast } from 'react-toastify';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false);

    // Hàm xoá sản phẩm
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteProduct.url, {
                method: SummaryApi.deleteProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: id })
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
                fetchdata(); // Làm mới danh sách sản phẩm
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("Lỗi kết nối đến server!");
            console.error(error);
        }
    };

    const renderPrice = () => {
        if (data.sellingPrice === 0) {
            return displayVNDCurrency(data.price);
        }
        return (
            <>
                <span className="line-through text-gray-500">
                    {displayVNDCurrency(data.price)}
                </span>
                <span className="ml-2 text-red-500 font-semibold">
                    {displayVNDCurrency(data.sellingPrice)}
                </span>
            </>
        );
    };

    return (
        <div className="bg-white p-4 rounded w-60 md:w-72 h-80 flex flex-col justify-between">
            <div className="w-full">
                <div className="w-full h-40 flex justify-center items-center mx-auto overflow-hidden">
                    <img
                        src={data?.productImage[0]}
                        alt="productImage"
                        className="object-contain h-full w-full"
                    />
                </div>
                <h1 className="text-ellipsis line-clamp-2 text-center text-sm md:text-base mt-2">
                    {data.productName}
                </h1>
            </div>

            <div className="mt-2">
                <p className="font-semibold text-center">{renderPrice()}</p>

                <div className="flex justify-end gap-2 mt-2">
                    {/* Nút sửa */}
                    <div
                        className="p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
                        onClick={() => setEditProduct(true)}
                        title="Chỉnh sửa"
                    >
                        <MdModeEditOutline />
                    </div>

                    {/* Nút xoá */}
                    <div
                        className="p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
                        onClick={() => {
                            if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?")) {
                                deleteProduct(data._id);
                            }
                        }}
                        title="Xoá sản phẩm"
                    >
                        <FaTrash />
                    </div>
                </div>
            </div>

            {/* Form chỉnh sửa */}
            {editProduct && (
                <AdminEditProduct
                    productData={data}
                    onClose={() => setEditProduct(false)}
                    fetchdata={fetchdata}
                />
            )}
        </div>
    );
};

export default AdminProductCard;
