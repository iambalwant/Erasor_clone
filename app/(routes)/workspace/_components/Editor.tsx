"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
//@ts-ignore
import Header from '@editorjs/header';
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Checklist from '@editorjs/checklist';
//@ts-ignore
import Paragraph from '@editorjs/paragraph';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { v } from 'convex/values';
import { useToast } from '@/components/ui/use-toast';
import { FILE } from '../../dashboard/_components/FileList';
const AlignmentTuneTool = require('editorjs-text-alignment-blocktune');

const rawDoc={
        "time" : 1550476186479,
        "blocks" : [{
            data:{
                text:'Click and Write your idea !!',
                level:2
            },
            id:'123',
            type:'header'
        },{
            data:{
                text:'Enter your text here',
                level:4
            },
            id:'1234',
            type:'paragraph'
        }],
        "version" : "2.8.1"
    
}

function Editor({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) {
    const { toast } = useToast();
    const ref=useRef<EditorJS>();
    const updateDocument=useMutation(api.files.updateDocument);
    const [document,setDocument] =useState(rawDoc);
useEffect(()=>{
  fileData&&initEditor();
},[fileData])

useEffect(()=>{
  console.log('trigger',onSaveTrigger);
  onSaveTrigger&&onSaveDocument();
},[onSaveTrigger])

const initEditor=()=>{
    const editor = new EditorJS({
      
      tools:{
        checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
        list:{
            class:List,
            inlineToolbar:true,
            config:{
                defaultStyle: 'ordered'
            }
        },
        header:{
            class:Header,
            tunes: ['anyTuneName'],
        config:{
            placeholder:'Enter Your idea',
            levels:[1,2,3,4],
            defaultLevel:1
        }
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        tunes: ['anyTuneName'],
      },
      anyTuneName: {
        class:AlignmentTuneTool,
        config:{
          default: "left",
          blocks: {
            header: 'left',
            list: 'left'
          }
        },
      }
      },
        holder: 'editorjs',
        data:fileData?.document?JSON.parse(fileData.document):rawDoc
    });
    ref.current=editor;
}

const onSaveDocument=()=>{
    if(ref.current){
        ref.current.save().then((outputData) => {
            console.log('Article data: ', outputData);
            updateDocument({
                _id:fileId,
                document:JSON.stringify(outputData)
            }).then(resp=>{
                toast({
                    title:"Document saved succesfully 🤩" 
                  })
            },(e)=>{
                toast({
                    title:"Error while saving document 😖" 
                  })
            })
          }).catch((error) => {
            console.log('Saving failed: ', error)
          });
    }
}
  return (
    <div className='p-6'>
      <div id='editorjs'></div>
    </div>
  )
}

export default Editor
