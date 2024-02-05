'use client'

import { signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { set } from "zod"
import Sidebar from "~/components/Sidebar"
import Description from "~/components/project/Description"
import Heading from "~/components/project/Heading"
import Overview from "~/components/project/Overview"
import { Button } from "~/components/ui/button"
import { getProject } from "~/lib/queries"
import { cn } from "~/lib/utils"
import { type Project } from "~/types/project"

export default function ProjectPage({ params }: { params: { projectId: string } }) {
    const [proj, setProj] = useState<Project>()
    console.log(proj)
    const [idea, setIdea] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true)
            const res = await getProject(params.projectId);
            const jsonProj = JSON.parse(res?.data ?? "") as Project
            console.log("fetchproj",jsonProj)
            setProj(jsonProj)
            setIdea(res?.idea ?? "")
            setIsLoading(false)
        }
        void fetchProject();
    }, [])
    console.log("proj printing", proj)

    return (
        <>
            <div className="bg-blue-200 h-full flex w-full">
                <Sidebar className="w-1/5 p-6" />



                <div className="w-4/5 bg-muted p-6 shadow-lg shadow-black flex flex-col gap-5">
                    <h2 className="p-5 font-semibold text-2xl capitalize ">{idea}</h2>
                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <Heading text="Overview" />
                        <Description />
                        {/* {!isLoading  ? proj?.target_audience : "Loading..."} */}
                    </div>

                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <Heading text="Target Audience" />
                        {/* <Description text={` ${proj?.target_audience}`} /> */}
                        <div>
                            <p className='text-md '>Your key target audience includes :</p>
                            <div className="flex gap-5">
                                {proj && proj.target_audience.split(',').map((aud, index) => {
                                    return <p key={index} className=' capitalize text-md underline underline-offset-4'>{aud}</p>
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Website UI design */}
                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <Heading text="Web UI Design" />
                        {/* <Description text={` ${proj?.target_audience}`} /> */}
                        <div>

                            <div className="grid grid-cols-4 gap-4 mt-3">
                                <img src="/ui1.png" className="aspect-auto w-[20rem]"/>
                                <img src="/ui2.png" className="aspect-auto w-[20rem"/>
                                <img src="/ui3.png" className="aspect-auto w-[20rem]"/>
                                <img src="/ui4.png" className="aspect-auto w-[20rem"/>
                            </div>
                        </div>

                    </div>

                    {/* DB Schema  */}
                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <Heading text="Database Schema Suggestions" />
                        {/* <Description text={` ${proj?.target_audience}`} /> */}
                        <div>

                            <div className="grid grid-cols-4 gap-4 mt-3">
                                {proj && proj.database_schema.map((aud, index) => {
                                    return <div key={index} className='p-3 capitalize text-md bg-violet-100   rounded-md'>
                                        <h4 className="text-lg font-bold underline underline-offset-2 mb-2 capitalize">{aud.category}</h4>
                                        {aud.properties.map((prop, index) => {
                                            return <p key={index} >{prop}</p>
                                        })
                                        }
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Typography Suggestions  */}
                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <Heading text="Typography Suggestions" />
                        {/* <Description text={` ${proj?.target_audience}`} /> */}
                        <div>

                            <div className="grid grid-cols-2  gap-4 mt-3">
                                {proj && proj.website_ui.typography.map((aud, index) => {
                                    return <div key={index} className='p-3 bg-blue-100 text-left flex flex-col gap-1 rounded-md'>
                                        <h4 className="text-xl font-bold capitalize" style={{fontFamily : aud}}>{aud}</h4>

                                        <p className="text-xl truncate" style={{fontFamily : aud}}>abcdefghijklmnopqrstuvwxyzABCDEFGHJIKLMNOPQRSTUVWXYZ</p>
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                    
                    {/* Color Palette Suggestions  */}
                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <Heading text="Color Palette Suggestions" />
                        {/* <Description text={` ${proj?.target_audience}`} /> */}
                        <div>

                            <div className="flex flex-col gap-4 mt-3">
                                {proj && proj.website_ui.color_pallete.map((aud, index) => {
                                    return <div key={index} className="flex gap-5">
                                        {aud.map((color, index) => {
                                            return <div key={index} className={cn("w-full aspect-square rounded-md flex justify-center items-center border-2 border-black")} style={{backgroundColor : `#${color}`}}>{color}</div>
                                        })
                                        }
                                    </div>
                                    


                                })}
                                        
                          
                            </div>
                        </div>

                    </div>

                    {/* Pain points of users  */}
                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <Heading text="Pain Points of Users" />
                        {/* <Description text={` ${proj?.target_audience}`} /> */}
                        <div>

                            <div className="flex flex-col gap-4 mt-3">
                                {proj && proj.pain_points_of_user.map((aud, index) => {
                                    return <div key={index} className='p-3 capitalize text-md bg-violet-100   rounded-md'>{aud}</div>
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Required Features  */}
                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <Heading text="Required Features" />
                        <div>

                            <div className="flex flex-col gap-4 mt-3">
                                {proj && proj.required_features.map((aud, index) => {
                                    return <div key={index} className='p-3 capitalize text-md bg-blue-100   rounded-md'>{aud}</div>
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Big Brands  */}
                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <div>
                            <Heading text="Big Brands" />
                            <p>Brands that dominate similar or this particular domain(s)</p>
                        </div>
                        {/* <Description text={` ${proj?.target_audience}`} /> */}
                        <div>

                            <div className="grid grid-cols-3 gap-4 mt-3">
                                {proj && proj.big_brands.map((aud, index) => {
                                    return <div key={index} className='p-3 capitalize text-md bg-blue-100 rounded-md'>{aud}</div>
                                })}
                            </div>
                        </div>

                    </div>


                    {/* Industry Trends  */}
                    <div className="rounded-md shadow-xl p-6 bg-gray-50">
                        <div>
                            <Heading text="Industry Trends" />
                        </div>
                        {/* <Description text={` ${proj?.target_audience}`} /> */}
                        <div>

                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <p className="bg-purple-100 rounded-md p-3">India : {proj?.industry_trends.india}</p>
                                <p className="bg-purple-100 rounded-md p-3">US/Europe : {proj?.industry_trends.us_europe}</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>



        </>
    )
} 