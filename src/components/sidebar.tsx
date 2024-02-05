import React, {useState} from 'react'
import { cn } from '~/lib/utils'
import SidebarHeading from './SidebarHeading';
import { Store, Target, LayoutPanelLeft, Database, CaseLower, Paintbrush, User, SlidersHorizontal, Building, Factory} from 'lucide-react'

const Sidebar = ({classNames, active} : {classNames? : string, active: string}) => {
  
  return (
    <div className='sidebar space-y-4 text-left p-5  ' >
        <div className="h-fit text-4xl font-bold">
          QuikPlanr
        </div>

        <div className="grid grid-cols-1"> 
          <SidebarHeading text="Overview" />
          <div className="flex flex-col">
            <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Overview" ? 'text-blue-500' : null}`}>
            <Store className="p-[0.2rem]" /> Overview
            </h1>
          </div>
          <SidebarHeading text="Target Audience" />
          <div className="flex flex-col">
          <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Target Audience" ? 'text-blue-500' : null}`}>
            <Target className="p-[0.2rem]" /> Target Audience
            </h1>
          </div>
          <SidebarHeading text="Website" />
          <div className="flex flex-col">
          <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Database Schema Suggestions" ? 'text-blue-500' : null}`}>
              <LayoutPanelLeft className="p-[0.2rem]"/> UI Design
            </h1>
            <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Database Schema Suggestions" ? 'text-blue-500' : null}`}>
            <Database className="p-[0.2rem]"/> Database Schema
            </h1>
            <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Typography Suggestions" ? 'text-blue-500' : null}`}>
            <CaseLower className="p-[0.2rem]"/> Typography
            </h1>
            <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Color Palette Suggestions" ? 'text-blue-500' : null}`}>
            <Paintbrush className="p-[0.2rem]"/> Color Pallete
            </h1>
          </div>
          <SidebarHeading text="User Dynamics" />
          <div className="flex flex-col">
            <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Pain Points of Users" ? 'text-blue-500' : null}`}>
            < User className="p-[0.2rem]" /> User Pain Point
            </h1>
            <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Required Features" ? 'text-blue-500' : null}`}>
            < SlidersHorizontal className="p-[0.2rem]" /> Required Features
            </h1>
          </div>
          <SidebarHeading text="Competitive Landscape" />
          <div className="flex flex-col">
            <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Big Brands" ? 'text-blue-500' : null}`}>
            < Building className="p-[0.2rem]" /> Brands
            </h1>
          </div>
          <SidebarHeading text="Industry Insights" />
          <div className="flex flex-col">
            <h1 className={`text-md px-[0.7rem] py-[0.4rem] flex ${active==="Industry Trends" ? 'text-blue-500' : null}`}>
            < Factory className="p-[0.2rem]" /> Industry Insights
            </h1>
          </div>
        </div>
    </div>
  )
}

export default Sidebar