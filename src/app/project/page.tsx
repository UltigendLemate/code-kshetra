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
import Waiting from "~/components/Waiting";


export default function Project() {
  const [idea, setIdea] = useState('')
  // const [loading, setLoading] = useState(false)
  const [proj, setProj] = useState<Project>()
  const [isLoading, setIsLoading] = useState(false)


  const givePrompt = async (values: string) => {
    console.log(values)
    setIsLoading(true)
    const res = await axios.post('/api/getData', { idea: values });
    setProj(res.data as Project)
    console.log(res.data)
    setIsLoading(false)
  }
  return (
    <>
    {isLoading ? <Waiting/> : 
      <main className="h-[90vh]   justify-center items-center flex">
        <div className="text-4xl text-center font-bold  w-1/3 mx-auto py-[5vh] h-fit">
          <img src="/input.gif" className=" aspect-auto m-auto" />
        </div>
        <div
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
          className="w-[50vw] max-h-fit m-auto h-fit border-spacing-6 rounded-lg p-[2vw] bg-white">

          <form onSubmit={() => givePrompt(idea)} className="space-y-2 grid">
            <h3 className="font-bold text-4xl  my-[2vh]"> Lets get the <span className="text-primary"> execution  </span>started!
            </h3>


            <label className="font-medium text-lg ">Tell us your amazing idea in 1 line</label>
            <Input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="a business to convert kitchen waste to organic manure" />

            <span className="font-semibold space-y-4 text-black/50 text-sm ">We will synthesis a proper business plan for you with proper research!</span>


            <Button className="!mt-7 w-fit" disabled={isLoading} type="submit">
              {!isLoading ? null : <div className="animate-spin"><AiOutlineLoading /> </div>}
              {!isLoading ? "Generate Idea" : "Generating Idea"}
            </Button>
          </form>

        </div>
      </main>
}
    </>
  )
}