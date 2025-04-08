'use client'
import { useLocalStorageState } from 'ahooks'
import React from 'react'
import { PromptItem } from '../Home'
import { Pin, PinIcon, PinOff } from 'lucide-react'

export default function PanelMore() {
  const [readPrompts, setReadPrompts] = useLocalStorageState<PromptItem[]>(
    'readPrompts',
    {
      defaultValue: [],
      listenStorageChange: true,
    }
  )

  function togglePin(id: string) {
    console.log(id)
    let newPrompts = readPrompts?.map(x => {
      if (x.id === id) {
        x.isPinned = !x.isPinned
      }
      return x
    })
    setReadPrompts(newPrompts)
  }

  function handleClick(id: string) {}

  return (
    <div className="min-w-[300px] flex flex-col p-1">
      {readPrompts
        // ?.filter(x => x.isPinned)
        ?.map(x => {
          return (
            <div
              onClick={() => handleClick(x.id)}
              className="flex items-center gap-1 cursor-auto hover:bg-gray-300/50 p-2 rounded w-full group"
              key={x.id}
            >
              <div dangerouslySetInnerHTML={{ __html: x.icon || '' }} />
              <span className="text-sm">{x.name}</span>

              <div className="ml-auto flex items-center gap-1">
                {x.id == '298' && (
                  <div className="p-1 rounded-lg cursor-pointer  opacity-0 group-hover:opacity-100 hover:bg-gray-300/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M8.029 1.262a.525.525 0 0 1 .742 0l3.5 3.5a.523.523 0 0 1-.371.896H2.1a.525.525 0 1 1 0-1.05h8.533L8.029 2.005a.525.525 0 0 1 0-.743m3.871 7.08H2.1a.523.523 0 0 0-.485.726.5.5 0 0 0 .114.17l3.5 3.5a.525.525 0 1 0 .742-.743L3.367 9.392H11.9a.525.525 0 0 0 0-1.05"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                )}
                <div
                  onClick={e => {
                    e.stopPropagation()
                    togglePin(x.id)
                  }}
                  className=" p-1 rounded-lg cursor-pointer hover:bg-gray-300/50"
                >
                  {x.isPinned ? (
                    <PinIcon className="text-primary" size={14} />
                  ) : (
                    <Pin
                      size={14}
                      className="opacity-0 group-hover:opacity-100"
                    />
                  )}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
