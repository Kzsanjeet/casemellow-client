"use client"
import BestSell from '@/components/Cards/BestSelling/BestSell'
import Popular from '@/components/Cards/Popular/Popular'
import Category from '@/components/Category/Category'
import Customize from '@/components/Coustomize/Customize'
import Footer from '@/components/Footer/Footer'
import HappyCustomer from '@/components/Gallery/HappyCustomer'
import Nav from '@/components/Nav/Nav'
import ScrollToTop from '@/components/ScrollUp/ScrollToTop'
import Carousel from '@/components/Slider/Carousel'
import React from 'react'
import Slider from 'react-slick'

const Page = () => {
    return (
        <div className='w-full min-h-screen bg-white'>
            <Nav/>
            <Carousel/>
            <Customize/>
            <Category/>
            <Popular/>
            <BestSell/>
            <HappyCustomer/>
            <Footer/>
        </div>
    )
}

export default Page