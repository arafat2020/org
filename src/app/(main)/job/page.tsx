import React from 'react'
import { JobForm } from './_components/JobForm'
import { SparklesPreview } from '../../_components/SparkleHeading'

function page() {
  return (
    <div className='w-full h-auto'>
        <SparklesPreview title='Join Our Team'/>
        <JobForm/>
    </div>
  )
}

export default page