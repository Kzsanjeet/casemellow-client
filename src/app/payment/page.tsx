import Loader from '@/components/Loading/Loader'
import Payment from '@/components/Payment/Payment'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <Payment/>
      </Suspense>
    </div>
  )
}

export default page
