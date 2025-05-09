import React from 'react'
import './App.css'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage';
import ProductPage from './Pages/ProductPage';
import SingleProduct from './Pages/SingleProduct';
import ScrollToTop from './utils/scrollToTop';
import ProfilePage from './Pages/ProfilePage';
import Orders from './components/Orders';
import Wishlist from './Pages/Wishlist';
import PersonalInformation from './components/PersonalInformation';
import PageNotFound from './Pages/PageNotFound';
import Cart from './Pages/Cart';
import FAQ from './Pages/FAQ';
import Contact from './Pages/Contact';

const App = () => {
  return (
    <div className='overflow-x-hidden overflow-y-auto'>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/single-product' element={<SingleProduct />} />
        <Route path='/profile' element={<ProfilePage />}>
          <Route path='' element={<PersonalInformation />} />
          <Route path='orders' element={<Orders />} />
        </Route>
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/faqs' element={<FAQ />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
