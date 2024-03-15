import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader({onSave}:any) {
  return (
    <div className='p-3 border-b flex justify-between items-center bg-black'>
        <div className='flex gap-4 items-center'>
      <Image src={'/assets/asset 0.svg'} alt='logo' height={80} width={80}/>
      <h2 className='text-white'>File name</h2>
      </div>
      <div className='flex items-center gap-4'>
      <Button className='h-8 text-[12px] gap-2 bg-yellow-600 hover:bg-yellow-700-700' onClick={()=>onSave()}>Save <Save className='h-4 w-4'/></Button>
      <Button className='h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700'>Share <Link className='h-4 w-4'/></Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader
