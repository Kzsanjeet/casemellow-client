import Loader from '@/components/Loading/Loader'
import VerifyEmail from '@/components/Login/Verify-email'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <VerifyEmail/>
      </Suspense>
    </div>
  )
}

export default page
