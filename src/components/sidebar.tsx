import React from 'react'
import { cn } from '~/lib/utils'


const Sidebar = ({className} : {className? : string}) => {
  return (
    <div className={cn('h-screen bg-red-500',className)} >
        sidebar
    </div>
  )
}

export default Sidebar