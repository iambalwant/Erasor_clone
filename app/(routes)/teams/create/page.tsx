"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function createTeam() {

    const [teamName, setTeamName] = useState('');
   const createTeam=useMutation(api.teams.createTeam);
   const {user}:any = useKindeBrowserClient();
   const router = useRouter(); 
   const { toast } = useToast()

   const createNewTeam=()=>{
    createTeam({
        teamName:teamName,
        createby:user?.email
    }).then(resp=>{
        console.log(resp)
        if(resp)
        {
          router.push('/dashboard');
          toast({
            title:"Teams is created 🥳"
          })
        }
    })
    }
   

  return (
    <div className='px-6 md:px-16 my-16'>
      <Image src="/assets/asset 0.svg" alt="logo" width={200} height={200}/>
      <div className='flex flex-col items-center mt-8'>
        <h2 className='font-bold text-[40px] py-3'>What should we call your team?</h2>
        <h2 className='text-gray-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2>
        <div className='mt-7 w-[40%]'>
            <label className='text-gray-500'>Team Name</label>
            <Input placeholder='Team name' className='mt-3' onChange={(e)=>setTeamName(e.target.value)}/>
        </div>
    <Button className='bg-blue-500 mt-9 w-[30%] hover:bg-blue-700' disabled={!(teamName&&teamName?.length>0)} onClick={()=>createNewTeam()}>Create Team</Button>
      </div>
    </div>
  )
}

export default createTeam
