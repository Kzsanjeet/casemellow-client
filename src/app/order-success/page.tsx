import Loader from '@/components/Loading/Loader'
import OrderSuccess from '@/components/SuccessOrder/OrderSuccess'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <OrderSuccess/>
      </Suspense>
    </div>
  )
}

export default page
