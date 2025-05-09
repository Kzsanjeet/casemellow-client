import Loader from '@/components/Loading/Loader'
import CustomizePayment from '@/components/Payment/CustomizePayment'
import Payment from '@/components/Payment/Payment'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <CustomizePayment/>
      </Suspense>
    </div>
  )
}

export default page
