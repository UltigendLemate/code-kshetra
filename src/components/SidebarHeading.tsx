import React from 'react'

const SidebarHeading = ({text} : {text:string}) => {
  return (
    <div className="h-fit p-[0.7rem] font-semibold text-lg">
        
        {text}
    </div>
  )
}

export default SidebarHeading