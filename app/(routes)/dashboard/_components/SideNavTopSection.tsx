import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Separator } from '@/components/ui/separator'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export interface TEAM{
    createBy:String;
    teamName:String;
    _id:String;
}

function SideNavTopSection({user,setActiveTeamInfo}:any) {
    const menu=[
        {
            id:1,
            name:'create Team',
            path:'/teams/create',
            icon:Users
        },
        {
            id:2,
            name:'Setting',
            path:'',
            icon:Settings,
        }
    ];
    const router=useRouter();
    const convex =useConvex();
    const [activeTeam,setActiveTeam] =useState<TEAM>();
    const [teamList, setTeamList] =useState<TEAM[]>();

 useEffect(()=>{
    user&&getTeamList();
 },[user])

useEffect(()=>{
  activeTeam&&setActiveTeamInfo(activeTeam)
},[activeTeam])

    const getTeamList=async()=>{
        const result=await convex.query(api.teams.getTeams,{email:user?.email})
        console.log(result)
        setTeamList(result);
        setActiveTeam(result[0]);
    }
     const onMenuClick=(item:any)=>{
    if(item.path){
         router.push(item.path);
    }
     }
  return (
    <div>
    <Popover>
  <PopoverTrigger><div className='flex items-center gap-3 hover:bg-slate-200-200 p-2 rounded-md cursor-pointer'>
      <Image src='/assets/asset 0.svg' alt='logo'width={80} height={80}/>
      <h2 className='flex gap-2 items-center font-bold text-[15px]'>{activeTeam?.teamName}
        <ChevronDown/>
      </h2>
      
        </div></PopoverTrigger>
  <PopoverContent className='ml-7 p-4'>
    {/* Teams Sections  */}
     <div>
        {teamList?.map((team,index)=>(
        <h2 key={index}
        className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer ${activeTeam?._id==team._id&&'bg-blue-500 text-white'}`} onClick={()=>setActiveTeam(team)}>{team.teamName}</h2>
        ))}
     </div>
     <Separator className='mt-2 mb-2 bg-slate-200'/>
        {/* Menu Sections */}
    <div>
        {menu.map((items,index)=>(
            <h2 key={index} className='flex gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer rounded-l text-sm' onClick={()=>onMenuClick(items)}>
                <items.icon className='h-4 w-4'/>
                {items.name}</h2>
        ))}
        <LogoutLink>
        <h2 className='flex gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer rounded-l text-sm'>
                <LogOut className='h-4 w-4'/>
                LogOut</h2>
        </LogoutLink>        
    </div>
    <Separator className='mt-2 bg-slate-100'/>
    {/* user info section  */}
     {user&&<div className='mt-2 flex gap-2 items-center'>
        <Image src={user?.picture} alt='user logo'
        width={30}
        height={30}
        className='rounded-full'/>
        <div>
            <h2 className='tex-[14px] font-bold'>{user?.given_name}{user?.family_name}</h2>
            <h2 className='text-[12px] text-gray-500'>{user?.email}</h2>
        </div>
       </div>}
  </PopoverContent>
</Popover>
{/* All file button  */}
<Button variant={'outline'} className='bg-gray-200 mt-8 w-full justify-start gap-2  font-bold'>
    <LayoutGrid className='h-5 w-5'/>
    All Files
</Button>
</div>
  )
}

export default SideNavTopSection
