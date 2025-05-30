import { useLocalStorageState } from 'ahooks'
import React from 'react'
import {
  Languages,
  LanguagesList,
} from '@/components/LanguageSelect/LanguagesList'
import { Input, Select } from 'antd'
import { ChangeEventHandler, FC, useMemo, useState } from 'react'

// import { CustomScroll } from 'react-custom-scroll'
import classNames from 'clsx'
import { Search, ArrowUp } from 'lucide-react'

export default function Translate() {
  const [translateLang, setTranslateLang] = useLocalStorageState(
    'translateLang',
    {
      defaultValue: {
        code: 'en',
        ename: 'English',
        language: 'English',
      },
      listenStorageChange: true,
    }
  )
  const [inputValue, setInputValue] = useState<string>('')
  const [selectDropdownOpen, setSelectDropdownOpen] = useState(false)

  const extendedLanguagesList = useMemo(() => {
    return LanguagesList
  }, [])

  const [language, setLanguage] = useState<Languages | null>(
    () =>
      extendedLanguagesList.find(v => v.code === translateLang?.code) || null
  )

  const filteredLanguageList = useMemo(() => {
    const searchValue = inputValue.toLowerCase()
    return extendedLanguagesList.filter(
      item =>
        item.language.toLowerCase().includes(searchValue) ||
        item.ename.toLowerCase().includes(searchValue)
    )
  }, [inputValue, extendedLanguagesList])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e?.target?.value)
  }

  const handleClickOption: (item: Languages) => void = item => {
    setLanguage(item)
    setTranslateLang(item)
  }
  return (
    <div className="library-setting-language h-[300px] min-w-[200px] flex flex-col p-1 ">
    <Input
      value={inputValue}
      onChange={handleInputChange}
      prefix={<Search style={{ marginRight: 3 }} />}
      style={{ boxShadow: selectDropdownOpen ? 'none' : 'initial' }}
      className="font-normal-16 border-none !bg-color-grey-fill2-normal hover:bg-color-grey-fill2-normal "
    />
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full max-h-[calc(100%-42px)]">
      {filteredLanguageList.length > 0 ? (
        filteredLanguageList.map((item, index) => (
          <div
            key={item.code}
            onClick={() => handleClickOption(item)}
            className={classNames(
              'w-full rounded-[8px] cursor-pointer py-[4px] px-[8px]',
              item.code === language?.code
                ? 'bg-color-brand-primary-focus'
                : 'hover:bg-color-grey-fill2-normal'
            )}
          >
            <div className="font-normal-14 text-color-text-primary-1">
              {item.ename}
            </div>
            <div className="font-normal-12 text-color-text-primary-4">
              {item.language}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-auto py-[26px] flex flex-col items-center justify-center">
          null
        </div>
      )}
    </div>
  </div>
  )
}
