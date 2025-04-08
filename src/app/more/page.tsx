'use client'
import { send } from '@/utils'
import { defaultPrompts } from '@/utils/prompts'
import { useLocalStorageState } from 'ahooks'
import React from 'react'

type Prompt = {
  id: string
  name: string
  icon: string
  isPinned: boolean
}


export default function Page() {
  const [prompts, setPrompts] = useLocalStorageState<Prompt[]>('prompts', {
    defaultValue: defaultPrompts  ,
    listenStorageChange:true
  },
  
  )

function togglePin(id: string) {
  console.log(id)
let newPrompts = prompts?.map(x => {
    if (x.id === id) {
      x.isPinned = !x.isPinned
    }
    return x
  })
  setPrompts(newPrompts)
}
  
  function handleClick(id: string) {
    send({
      name: 'do_dynamic_menu_action',
      url: '/panels/' + id,
    })
  }



  return (
    <div className="min-w-[300px] flex flex-col p-1">
      {
        prompts?.map(x => {
          return (
            <div onClick={()=>handleClick(x.id)} className="flex items-center gap-1 cursor-auto hover:bg-gray-300/50 p-2 rounded w-full group" key={x.id}>
              <div dangerouslySetInnerHTML={{ __html: x.icon }} />
              <span className="text-sm">
                {x.name}
              </span>
              
              <div onClick={(e) => {
                e.stopPropagation()
                togglePin(x.id)
              }} className='ml-auto p-1 rounded-lg cursor-pointer hover:bg-gray-300/50'>
                {x.isPinned ? (
                  <img className='text-amber-700' src="/pinActive.svg" alt="" />
                ) : (
                  <img className='opacity-0 group-hover:opacity-100' src="/pin.svg" alt="" />
                )}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
