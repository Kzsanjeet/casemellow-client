import Loader from '@/components/Loading/Loader'
import CustomizeOrderSucces from '@/components/SuccessOrder/CustomiseOrderSuccess'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <CustomizeOrderSucces/>
      </Suspense>
    </div>
  )
}

export default page
