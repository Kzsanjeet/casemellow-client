"use client"
import Footer from '@/components/Footer/Footer';
import Nav from '@/components/Nav/Nav';
import React, { useEffect } from 'react'

const page = () => {
    useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "//assets.pinterest.com/js/pinit.js";
    document.body.appendChild(script);
  }, []);
  return (
    <div className='bg-white'>
      <Nav/>
      <div className="text-center mb-10 mt-4 pt-20 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
          Popular Designs
          <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
        </h1>
        <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">
          Choose your prefered design from our pininterest board 
        </p>
      </div>
      
      <div className='p-10 w-full flex flex-col justify-center items-center'>
        <a
        data-pin-do="embedBoard"
        data-pin-board-width="1200"
        data-pin-scale-height="700"
        data-pin-scale-width="80"
        href="https://www.pinterest.com/sanjeetkazi/anime/"
      ></a>
      </div>

       <div className='p-10 w-full flex flex-col justify-center items-center'>
        <a
        data-pin-do="embedBoard"
        data-pin-board-width="1200"
        data-pin-scale-height="700"
        data-pin-scale-width="80"
        href="https://www.pinterest.com/sanjeetkazi/luxury/"
      ></a>
      </div>

      <div className='p-10 w-full flex flex-col justify-center items-center'>
        <a
        data-pin-do="embedBoard"
        data-pin-board-width="1200"
        data-pin-scale-height="700"
        data-pin-scale-width="80"
        href="https://www.pinterest.com/sanjeetkazi/marvel/"
      ></a>
      </div>

      <div className='p-10 w-full flex flex-col justify-center items-center'>
        <a
        data-pin-do="embedBoard"
        data-pin-board-width="1200"
        data-pin-scale-height="700"
        data-pin-scale-width="80"
        href="https://www.pinterest.com/sanjeetkazi/mandala/"
      ></a>
      </div>

      <div className='p-10 w-full flex flex-col justify-center items-center'>
        <a
        data-pin-do="embedBoard"
        data-pin-board-width="1200"
        data-pin-scale-height="700"
        data-pin-scale-width="80"
        href="https://www.pinterest.com/sanjeetkazi/sports/"
      ></a>
      </div>

      <div className='p-10 w-full flex flex-col justify-center items-center'>
        <a
        data-pin-do="embedBoard"
        data-pin-board-width="1200"
        data-pin-scale-height="700"
        data-pin-scale-width="80"
        href="https://www.pinterest.com/sanjeetkazi/god/"
      ></a>
      </div> 

      <div className='p-10 w-full flex flex-col justify-center items-center'>
        <a
        data-pin-do="embedBoard"
        data-pin-board-width="1200"
        data-pin-scale-height="700"
        data-pin-scale-width="80"
        href="https://www.pinterest.com/sanjeetkazi/unique/"
      ></a>
      </div>

      

    <Footer/>
    </div>
  )
}


export default page