import React from 'react';
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-6'>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
        
        {/* Cột 1 - Giới thiệu */}
        <div>
          <h2 className="text-lg font-semibold mb-3">TTG Shop</h2>
          <p className="text-sm">
            Chuyên cung cấp các sản phẩm, phụ kiện công nghệ chính hãng với giá tốt nhất.
          </p>
        </div>

        {/* Cột 2 - Danh mục sản phẩm */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Danh mục sản phẩm</h2>
          <ul className="text-sm space-y-2">
            <li><Link to={"/product-category"}className="hover:text-blue-400">Laptop</Link></li>
          </ul>
        </div>

        {/* Cột 3 - Hỗ trợ khách hàng */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Hỗ trợ khách hàng</h2>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-blue-400">Chính sách bảo hành</a></li>
            <li><a href="#" className="hover:text-blue-400">Chính sách đổi trả</a></li>
          </ul>
        </div>

        {/* Cột 4 - Liên hệ & Mạng xã hội */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Liên hệ</h2>

          <div className="flex items-center space-x-2 text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            <p>Địa chỉ: 83A Cửu Long - Phường 15 - Q10 - TP.HCM</p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm mt-2">
            <FaPhoneAlt className="text-green-500" />
            <p>Hotline: 087.997.9997 - 098.655.2233</p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm mt-2">
            <FaEnvelope className="text-gray-300" />
            <p>Email: support@technologyshop.com</p>
          </div>

          {/* Mạng xã hội */}
          <div className="flex space-x-6 mt-4 text-2xl">
            <a href="https://www.facebook.com/ttgshopvn" aria-label="Facebook" className="text-blue-500 hover:text-blue-400"><BiLogoFacebook /></a>
            <a href="https://www.facebook.com/ttgshopvn" aria-label="Instagram" className="text-pink-500 hover:text-pink-400"><BiLogoInstagram /></a>
            <a href="https://www.facebook.com/ttgshopvn" aria-label="Twitter" className="text-sky-500 hover:text-sky-400"><BiLogoTwitter /></a>
          </div>
        </div>

      </div>

      {/* Dòng bản quyền */}
      <div className="text-center text-sm border-t border-gray-700 mt-6 pt-4">
        © 2025 TTG Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
