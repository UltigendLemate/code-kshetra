'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { set } from "zod"
import { Button } from "~/components/ui/button"
import { addNewProject } from "~/lib/queries"
import { Project } from "~/types/project"

export default function Project(){
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
        <h1>how are you</h1>
        <Button onClick={()=>addProj()}>
            click
        </Button>
        {isLoading && <h1>loading</h1>}
        </>
    )
}