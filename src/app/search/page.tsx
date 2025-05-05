import Loader from '@/components/Loading/Loader'
import MainSearch from '@/components/search/MainSearch'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>}
      >
          <MainSearch/>
      </Suspense>
    </div>
  )
}

export default page
