import React from 'react'
import Card from '../Card'
import ShinyText from '@/components/ReactBits/ShinyText'

const Popular = () => {
  return (
    <div className='p-4 sm:p-6 md:p-8 flex flex-col items-center'>
      <div className="text-center mb-6 md:mb-8 mt-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2">Popular Products</h1>
        <div className='bg-red-500 h-1'></div>
        <p className="text-xl sm:text-xl sm:mt-2 font-medium text-gray-700">Shop from popular phone cases</p>
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
