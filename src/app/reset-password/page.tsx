import Loader from '@/components/Loading/Loader'
import ResetPassword from '@/components/ResetPassword/ResetPassword'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <ResetPassword/>
      </Suspense>
    </div>
  )
}

export default page
