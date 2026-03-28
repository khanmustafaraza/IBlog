import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

const PublicLayout = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
        <Footer/>
        </div>
  )
}

export default PublicLayout