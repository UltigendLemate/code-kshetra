'use client'
import { FC } from 'react'
import { Button } from './ui/button'
import { signIn, useSession } from 'next-auth/react'



const SignInButton = () => {
    const session = useSession();
    // console.log(session)
    return <Button onClick={()=>signIn('google')} >Sign In</Button>
}

export default SignInButton