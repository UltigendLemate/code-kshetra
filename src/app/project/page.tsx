"use client"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { AiOutlineLoading } from 'react-icons/ai';

import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { addNewProject } from "~/lib/queries"
import { type Project } from "~/types/project"


export default function Project(){
    const [idea, setIdea] = useState('')
    const [loading, setLoading] = useState(false)
    const [proj, setProj] = useState<Project>()
    const [isLoading, setIsLoading] = useState(false)


    const givePrompt = async (values : string) =>{
      console.log(values)
        setIsLoading(true)
        const res = await axios.post('/api/getData', {idea : values}) ;
        setProj(res.data as Project)
        console.log(res.data)
        setIsLoading(false)
    }
    return (
        <>
        <main className="h-screen w-screen align-middle flex">
<div className="text-4xl text-center font-bold w-1/3 mx-auto py-[5vh] h-fit">
    <img src="/input.gif" className="w-4/5 aspect-auto m-auto" />
</div>
<div 
style={{
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
}}
className="w-[50vw] max-h-fit m-auto h-fit border-spacing-6 rounded-lg p-[2vw] bg-white">
<Form>
    
      <form onSubmit={()=>givePrompt(idea)} className="space-y-4 grid">
      <div className="font-bold text-2xl text-center my-[2vh]"> Create Product Requirement Document</div>
        <span className="font-bold text-xl my-1"> Input</span>
                <Input 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="a business to convert kitchen waste to organic manure"  />

                <span className="font-semibold space-y-4 text-black/50 text-sm my-1">Enter your idea and our AI will synthesize Business Plan for you</span>
        <Button className={`mx-auto justify-center ${isLoading ? 'cursor-not-allowed' : '' }`} type="submit">
            {isLoading===false ? null : <div className="animate-spin"><AiOutlineLoading /> </div>}
            {isLoading===false ? "Generate Idea" : "Generating Idea"}
        </Button>
      </form>
    </Form>
    </div>
        </main>
        {isLoading && <h1>loading</h1>}
        </>
    )
}