import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottomSection from './SideNavBottomSection';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useToast } from '@/components/ui/use-toast'
import { FileListContext } from '@/app/_context/FilesListContext';

function SideNav() {
  const { toast } = useToast()
    const {user}:any = useKindeBrowserClient();
    const createFile=useMutation(api.files.createFile);
    const [activeTeam,setActiveTeam]=useState<TEAM>();
    const convex=useConvex()
 const [totleFiles,setTotleFiles]=useState<Number>()
 const {fileList_,setFileList_}=useContext(FileListContext);

    useEffect(()=>{
      activeTeam&&getFiles();
    },[activeTeam])
   const onFileCreate=(fileName:string)=>{
    createFile({
      fileName:fileName,
      teamId:activeTeam?._id,
      createdBy:user?.email,
      archive:false,
      document:'',
      whiteboard:''
    }).then(resp=>{
      if(resp){
        getFiles();
        toast({
          title:"File created successfully !! 😎" 
        })
      }
      },(e)=>{
        toast({
          title:"Error While creating file 😖"
        })
    })
   }

   const getFiles=async()=>{
        const result=await convex.query(api.files.getFiles,{teamId:activeTeam?._id})
        console.log(result);
        setFileList_(result);
        setTotleFiles(result?.length);
   }
  return (
    <div className='flex flex-col h-screen fixed w-72 border-r p-6'>
        <div className='flex-1'><SideNavTopSection user={user} setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}/></div>
        <div>
            <SideNavBottomSection onFileCreate={onFileCreate} totleFiles={totleFiles}/>
            
        </div>
    </div>
  )
}

export default SideNav
