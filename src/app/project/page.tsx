"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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


import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { addNewProject } from "~/lib/queries"
import { type Project } from "~/types/project"

const formSchema = z.object({
    idea: z.string().min(16, {
      message: "Idea must be atleast 16 characters long",
    }),
  })

export default function Project(){
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          idea: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if(loading) {

        }
        console.log(values)
      }

    const [proj, setProj] = useState<Project>()
    const [isLoading, setIsLoading] = useState(false)
    const [counter, setCounter] = useState(0)
    const addProj = async()=>{
        if(!proj) return;
        await addNewProject(proj,'an agency which provides ai chat bots for whatsapp which helps people to leverage these bots to tag many users at once, handle customer issues on whatsapp using ai bot')
    }
    useEffect(()=>{
    
        void givePrompt('an agency which provides ai chat bots for whatsapp which helps people to leverage these bots to tag many users at once, handle customer issues on whatsapp using ai bot')

    },[counter])

    const givePrompt = async (idea : string) =>{
        setIsLoading(true)
        const res = await axios.post('/api/getData', {idea}) 
        setProj(res.data as Project)
        console.log(res.data)
        setIsLoading(false)
    }
    return (
        <>
        <main className="h-screen w-screen bg-[url('/bg.jpg')] bg-cover bg-center table-cell align-middle">
<h1 className="text-4xl text-center font-bold w-1/2 mx-auto py-[5vh]">
    Submit your <span className="">idea</span> and we will generate a business plan aroound it 
</h1>
<div 
style={{
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
}}
className="w-[50vw] max-h-fit m-auto border-spacing-6 rounded-lg p-[5vw] bg-white block">
<Form {...form}>
    
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {!loading ? <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Enter Idea</FormLabel>
              <FormControl>
                <Input placeholder="a business to convert kitchen waste to organic manure" {...field} />
              </FormControl>
              <FormDescription>
                This is your idea and AI will generate business plan for you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> : <>
        <p>AI is preparing your plan</p>
        </> }
        <Button className={`mx-auto justify-center ${loading ? 'cursor-not-allowed' : '' }`} type="submit">
            {loading===false ? "Generate Idea" : "Generating Idea"}
        </Button>
      </form>
    </Form>
    </div>
        </main>
        <Button onClick={()=>addProj()}>
            click
        </Button>
        {isLoading && <h1>loading</h1>}
        </>
    )
}