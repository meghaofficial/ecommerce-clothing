import React from 'react'
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const ProductPage = () => {

      const location = useLocation();
      const subCategory = location.state?.subCategory;

  return (
    <div className='mt-16'>
     <p className='text-black uppercase playfair-display text-center text-[2.2em] mt-[100px] mb-5'>
      { subCategory }
     </p>
     <div className='border-b border-gray-300 w-[90%] h-[10px] m-auto'></div>
     <div className='flex gap-5 items-center justify-end px-15 mt-10'>
      <select className='text-[0.8em] border rounded border-gray-500'>
            <option value="12">VIEW 12 PRODUCTS</option>
            <option value="24">VIEW 24 PRODUCTS</option>
            <option value="48">VIEW 48 PRODUCTS</option>
            <option value="96">VIEW 96 PRODUCTS</option>
      </select>
      <select className='text-[0.8em] w-[10%] border rounded border-gray-500'>
            <option value="default">DEFAULT SORTING</option>
            <option value="popularity">SORT BY POPULARITY</option>
            <option value="latest">SORT BY LATEST</option>
            <option value="low to high">SORT BY PRICE: LOW TO HIGH</option>
            <option value="high to low">SORT BY PRICE: HIGH TO LOW</option>
      </select>
     </div>
     <div className='flex flex-wrap items-center justify-center gap-5 p-10'>
      {Array.from({ length: 10 }).map((_, index) => (
            <ProductCard key={index} />
      ))}
     </div>
     <Footer />
    </div>
  )
}

export default ProductPage
