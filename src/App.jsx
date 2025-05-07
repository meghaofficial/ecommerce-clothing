import React from 'react'
import './App.css'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage';
import ProductPage from './Pages/ProductPage';
import SingleProduct from './Pages/SingleProduct';
import ScrollToTop from './utils/scrollToTop';
import ProfilePage from './Pages/ProfilePage';

const App = () => {
  return (
    <div className='overflow-x-hidden overflow-y-auto'>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/single-product' element={<SingleProduct />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
