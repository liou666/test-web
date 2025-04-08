'use client'
import React, { useState, useEffect } from 'react'
import { defaultPrompts as listAllPrompt } from '@/utils/prompts'
import { useLocalStorageState } from 'ahooks'
import { match } from 'ts-pattern'
import { ArrowUp } from 'lucide-react'
import { sendIpc } from '@/utils'
export type PromptItem = {
  id: string
  key: string
  isCustom?: boolean
  name: string
  shortName?: string
  content: string
  usedIn?: string[]
  icon?: string
  placeholder?: string
  parentKey?: string
  children?: PromptItem[]
  tip?: string
  isPinned?: boolean
}

export default function PanelHome() {
  const [language] = useLocalStorageState('lang', {
    listenStorageChange: true,
    deserializer: value => value as string,
  })

  const [selectText, setSelectText] = useLocalStorageState('select_text', {
    defaultValue: '',
  })

  const [readPrompts, setReadPrompts] = useLocalStorageState<PromptItem[]>(
    'readPrompts',
    {
      defaultValue: listAllPrompt,
      listenStorageChange: true,
    }
  )


  const handleClick = async (id: string) => {
    let gst = { name: 'get_selected_text' }
    // @ts-ignore
    const res = (await navigator.clipboard.veles(JSON.stringify(gst))) as any
    const { text } = JSON.parse(res)
    setSelectText(text || '')

    sendIpc({
      name: 'open_dynamic_menu',
      type: 'functional',
      url: 'http://localhost:8081/panels?type=result',
    })
  }

  const handleOpenTranslate = (id: string) => {
    sendIpc({
      name: 'open_dynamic_menu',
      type: 'translate',
      from: 'root',
      url: 'http://localhost:8081/panels?type=translate',
    })
  }

  const handleClickMore = () => {
    sendIpc({
      name: 'open_dynamic_menu',
      type: 'functional',
      url: 'http://localhost:8081/panels?type=more',
    })
  }

  return (
    <div className="w-full h-full  flex p-1 gap-1 ">
      {readPrompts
        ?.filter(x => x.isPinned)
        ?.map(x => {
          return (
            <div
              className="flex items-center  flex-1"
              onClick={() => handleClick(x.id)}
              key={x.id}
            >
              <div className="flex items-center justify-center  p-1.5 rounded  flex-1 gap-1 cursor-auto hover:bg-gray-300/50">
                <div
                  className=" "
                  dangerouslySetInnerHTML={{ __html: x.icon || '' }}
                />
                {readPrompts?.filter(x => x.isPinned).length <= 2 && (
                  <div className="text-sm">{x.name}</div>
                )}
              </div>
              {x.id == '298' ? (
                <>
                  <ArrowUp
                    size={12}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenTranslate(x.id)
                    }}
                    className="hover:bg-gray-300/50"
                  />
                </>
              ) : null}
            </div>
          )
        })}
      <div
        onClick={() => handleClickMore()}
        className="flex items-center p-1.5 rounded hover:bg-gray-300/50 cursor-auto justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M7 3.5a1.167 1.167 0 1 1 0-2.333A1.167 1.167 0 0 1 7 3.5m0 4.667a1.167 1.167 0 1 1 0-2.334 1.167 1.167 0 0 1 0 2.334m-1.167 3.5a1.167 1.167 0 1 0 2.334 0 1.167 1.167 0 0 0-2.334 0"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  )
}
