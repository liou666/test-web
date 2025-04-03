'use client'
import Image from "next/image";
import { useState } from "react";
import { useLocalStorageState } from "ahooks";
import { send } from "@/utils";
import { defaultPrompts } from "@/utils/prompts";

type Prompt = {
  id: string
  name: string
  icon: string
  isPinned: boolean
}



export default function Home() {

  const [prompts, setPrompts] = useLocalStorageState<Prompt[]>('prompts', {
    defaultValue: defaultPrompts,
    listenStorageChange:true
  },
  
  )

  const handleClick = (id: string) => {
    send({
      name: 'open_dynamic_menu',
      type: "functional",
      url: '/panels/' + id,
    })
  }

  const handleOpenTranslate = (id: string) => {
    send({
      name: 'open_dynamic_menu',
      type: "translate",
      from: "root",
      url: '/translate/'
    })
  }

  const handleClickMore = () => {
    send({
      name: 'open_dynamic_menu',
      url: '/more'
    })
  }


  return (
    <div className="w-full h-full  flex  p-1 gap-1 ">
      {
        prompts
          ?.filter(x=>x.isPinned)
          ?.map(x => {
          return (
            <div className="flex items-center  flex-1" onClick={()=>handleClick(x.id)}  key={x.id}>
              <div  className="cursor-auto hover:bg-gray-300/50 p-1.5 rounded" dangerouslySetInnerHTML={{ __html: x.icon }} />
              {
                x.id==="2"?<><img onClick={()=>handleOpenTranslate(x.id)} className="hover:bg-amber-500" src="/up.svg" alt="" /></>:null
              }
              {/* <span className="text-sm">
              {x.name}
             </span> */}
            </div>
          )
        })
      }
       <div onClick={()=>handleClickMore()} className="flex items-center justify-center cursor-auto hover:bg-gray-300/50 p-2 rounded" >
       开
        </div>
    </div>
  );
}
