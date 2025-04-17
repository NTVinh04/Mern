import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'


const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"earphones"} heading={"Tai nghe phổ biến"}/>
    
      <VerticalCardProduct category={"mobiles"} heading={"Điện thoại"} />
      <VerticalCardProduct category={"speakers"} heading={"Loa"} />
      <VerticalCardProduct category={"mouse"} heading={"Chuột máy tính"} />
      <VerticalCardProduct category={"computer"} heading={"Máy tính"} />
      <VerticalCardProduct category={"laptop"} heading={"Máy tính Laptop"} />
      <VerticalCardProduct category={"tablet"} heading={"Máy tính bảng"} />
      <VerticalCardProduct category={"gamings"} heading={"Máy chơi game"} />
    </div>
  )
}

export default Home