import React from 'react'
import Card from '../Card'
import ShinyText from '@/components/ReactBits/ShinyText'

const Popular = () => {
  return (
    <div className='py-12 sm:p-6 md:p-8 flex flex-col items-center'>
      <div className="text-center mb-10 mt-4 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
            Popular Products
            <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
          </h1>
          <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">
            Shop from popular phone cases
          </p>
      </div>
      <div className='w-full max-w-[80%] p-4 sm:p-6 rounded-lg flex justify-center items-center flex-wrap gap-11'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div> 
    </div>
  )
}

export default Popular
