import AddCustomize from '@/components/Coustomize/AddCustomize'
import Loader from '@/components/Loading/Loader'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <AddCustomize/>
      </Suspense>
    </div>
  )
}

export default page
