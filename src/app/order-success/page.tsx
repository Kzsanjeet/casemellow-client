import Loader from '@/components/Loading/Loader'
import OrderSuccessConFirm from '@/components/SuccessOrder/OrderSuccess'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <OrderSuccessConFirm/>
      </Suspense>
    </div>
  )
}

export default page
