'use client'
import React, { useState, useEffect } from 'react'
import { defaultPrompts as listAllPrompt } from '@/utils/prompts'
import { useLocalStorageState } from 'ahooks'
import { match } from 'ts-pattern'
import More from './More'
import PanelHome from './Home'
import Result from './Result'

import Translate from './Translate'
import { useSearchParams } from 'next/navigation'

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

type PanelType = 'result' | 'more' | 'home' | 'translate'

export default function Panels() {
  
  const params = useSearchParams()
  const type = params.get('type') as PanelType
  console.log('type: ', type)

  const [language] = useLocalStorageState('lang', {
    listenStorageChange: true,
    deserializer: value => value as string,
  })

  const [readPrompts, setReadPrompts] = useLocalStorageState<PromptItem[]>(
    'readPrompts',
    {
      defaultValue: listAllPrompt,
      listenStorageChange: true,
    }
  )


  return (
    <>
      {match(type)
        .with('home', () => {
          return <PanelHome />
        })
        .with('result', () => {
          return <Result />
        })
        .with('more', () => {
          return <More />
        })
        .with('translate', () => {
          return <Translate />
        })
        .exhaustive()}
    </>
  )
}
