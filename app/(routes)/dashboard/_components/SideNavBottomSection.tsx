import React, { useState } from 'react'
import { Archive, Flag, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import Constant from '@/app/_constant/Constant';
import PricingSection from './pricingSection';

function SideNavBottomSection({onFileCreate,totleFiles}:any) {

    const menuList=[
        {
            id:1,
            name:'Getting Started',
            icon:Flag,
            path:''
        },
        {
            id:2,
            name:'GitHub',
            icon:Github,
            path:''
        },
        {
            id:1,
            name:'Archive',
            icon:Archive,
            path:''
        }
    ]
    const [fileInput, setFileInput]=useState('')
  return (
    <div>
      {menuList.map((menu,index)=>(
        <h2 key={index} className='flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-200 rounded-md cursor-pointer'><menu.icon className='h-5 w-5'/>{menu.name}</h2>
      ))}
      {/* add new file button */}
      <Dialog>
  <DialogTrigger className='w-full' asChild>
  <Button className='w-full bg-blue-600 hover:bg-blue-700 justify-start mt-3'>New File</Button>
  </DialogTrigger>
  {totleFiles<Constant.MAX_FREE_FILE? <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new file</DialogTitle>
      <DialogDescription>
        <Input placeholder='Enter File name' className='mt-3'
        onChange={(e=>setFileInput(e.target.value))}
        />

      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
          <DialogClose asChild>
            <Button disabled={!(fileInput&&fileInput.length>0)} onClick={()=>onFileCreate(fileInput)} type="button" className='bg-blue-600 hover:bg-blue-700'>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>:
  <PricingSection/>
  }
</Dialog>
    {/* progreess bar */}
    <div className='h-4 w-full bg-gray-300 rounded-full mt-3'>
        <div style={{width:`${(totleFiles/5)*100}%`}} className={`h-4 bg-blue-600 rounded-full`}></div>
    </div>
      
     <h2 className='text-[12px] mt-3'><strong>{totleFiles}</strong> Out of <strong>{Constant.MAX_FREE_FILE}</strong> file used</h2>

    </div>
  )
}

export default SideNavBottomSection
