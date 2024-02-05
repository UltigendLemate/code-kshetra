import React from 'react'
import { cn } from '~/lib/utils'
import SidebarHeading from './SidebarHeading';
import { Store, Target, LayoutPanelLeft, Database, CaseLower, Paintbrush, User, SlidersHorizontal, Building} from 'lucide-react'

const Sidebar = ({className} : {className? : string}) => {
  return (
    <div className={cn('sticky top-0 left-0 block overflow-y-scroll bg-white space-y-4 text-left',className)} >
        <div className="h-fit text-4xl font-bold">
          QuikPlanr
        </div>

        <div className="grid grid-cols-1"> 
          <SidebarHeading text="Overview" />
          <div className="flex flex-col">
            <h1 className="text-md px-[0.7rem] py-[0.4rem] flex">
            <Store className="p-[0.2rem]" /> Overview
            </h1>
          </div>
          <SidebarHeading text="Traget Audience" />
          <div className="flex flex-col">
            <h1 className="text-md px-[0.7rem] py-[0.4rem] flex">
            <Target className="p-[0.2rem]" /> Target Audience
            </h1>
          </div>
          <SidebarHeading text="Website" />
          <div className="flex flex-col">
            <h1 className="text-md px-[0.7rem] py-[0.4rem] flex">
              <LayoutPanelLeft className="p-[0.2rem]"/> UI Design
            </h1>
            <h1 className="text-md px-[0.7rem] py-[0.4rem] flex">
            <Database className="p-[0.2rem]"/> Database Schema
            </h1>
            <h1 className="text-md px-[0.7rem] py-[0.4rem] flex">
            <CaseLower className="p-[0.2rem]"/> Typography
            </h1>
            <h1 className="text-md px-[0.7rem] py-[0.4rem] flex">
            <Paintbrush className="p-[0.2rem]"/> Color Pallete
            </h1>
          </div>
          <SidebarHeading text="User Dynamics" />
          <div className="flex flex-col">
            <h1 className="text-md px-[0.7rem] py-[0.4rem] flex">
            < User className="p-[0.2rem]" /> User Pain Point
            </h1>
            <h1 className="text-md px-[0.7rem] py-[0.4rem] flex">
            < SlidersHorizontal className="p-[0.2rem]" /> Required Features
            </h1>
          </div>
          <SidebarHeading text="Competitive Landscape" />
          <SidebarHeading text="Industry Insights" />
        </div>
    </div>
  )
}

export default Sidebar