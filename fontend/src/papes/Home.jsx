import React from 'react'
import CategoryList from '../component/CategoryList'
import BannerProduct from '../component/BannerProduct'
import HorizontalCardProduct from '../component/HorizontalCardProduct'

const Home = () => {
  return (
    <div>
        <CategoryList/>
        <BannerProduct/>
        <div className='pt-'><HorizontalCardProduct category={"Rau An toàn"} heading={"Rau Quả Không Hóa Chất & Hữu Cơ"}/></div>
        <div className='pt-20'><HorizontalCardProduct category={"Thịt tươi sống"} heading={"Thịt Heo Bò Gà"}/></div>
        <div className='pt-20'><HorizontalCardProduct category={"Thủy Hải Sản"} heading={"Thuỷ Hải Sản Sạch"}/></div>
        <div className='pt-20'><HorizontalCardProduct category={"Gia vị"} heading={"Gia Vị Thường Ngày"}/></div>
    </div>
  )
}

export default Home