import { ConfigProvider, Select, SelectProps } from 'antd'
import Cookies from 'js-cookie'
import { ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { FC, useEffect, useMemo, useState } from 'react'
import { LanguagesList } from './LanguagesList'
import  useOnce  from '@/hooks/useOnce'

interface Props {
  subLang: string
  onSubLangChange: (value: string) => void
  targetLang: string
  onTargetLangChange: (value: string) => void
  // 自动识别后的语言
  detectLang?: string
  disabledSubLang?: boolean
  disabledTargetLang?: boolean
}

const LanguageSelect: FC<Props> = ({
  subLang,
  onSubLangChange,
  targetLang,
  onTargetLangChange,
  detectLang,
  disabledSubLang,
  disabledTargetLang,
}) => {
  const t = useTranslations()
  const renderOptions: SelectProps['optionRender'] = (option, info) => {
    const ename = LanguagesList.find(l => l.code === option.value)?.ename
    return ename ? (
      <div className="inline-grid items-center grid-cols-[100px_85px] gap-1 w-full">
        <span className=" inline-block whitespace-break-spaces">
          {option.label}
        </span>
        <span className="whitespace-break-spaces text-[--gpts-black-text-color3] text-xs">
          {ename}
        </span>
      </div>
    ) : (
      <div className="w-full leading-tight flex gap-[20px] items-center">
        <div className="text-sm">{option.label}</div>
        <div className="text-xs text-[--gpts-black-text-color3]">
          Auto-Detect
        </div>
      </div>
    )
  }
  const LanguageOptions = useMemo(
    () =>
      LanguagesList.map(l => {
        return (
          <Select.Option key={l.code} value={l.code}>
            {l.language}
          </Select.Option>
        )
      }),
    []
  )
  return (
    <div className="flex gap-[7px] items-center">
      <ConfigProvider
        theme={{
          components: {
            Select: {
              optionSelectedBg: '#7A59FF29',
              optionActiveBg: '#72768B14',
              controlItemBgActive: '#72768B29',
              controlItemBgHover: '#72768B14',
              borderRadiusOuter: 8,
            },
          },
        }}
      >
        <Select
          variant="filled"
          className="flex-1 max-w-[270px] !rounded-[8px]"
          disabled={disabledSubLang}
          value={subLang}
          onChange={onSubLangChange}
          dropdownStyle={{ minWidth: 235, borderRadius: '8px' }}
          optionRender={renderOptions}
          popupClassName="!rounded-[8px] shadow-md"
        >
          <Select.Option value="auto">
            <div className="flex justify-between gap-2 font-normal-14 ">
              <div className="">
                {t('lp.products.traslator.translatorTool.autoDetect')}
              </div>
              {detectLang && (
                <div className="text-[--gpts-black-text-color3] ">
                  {detectLang}
                </div>
              )}
            </div>
          </Select.Option>
          {LanguageOptions}
        </Select>

        <ArrowRight />

        {/* language select custom - optionRender*/}
        <Select
          variant="filled"
          className="flex-1 max-w-[270px] !rounded-[8px]   font-normal-14"
          disabled={disabledTargetLang}
          value={targetLang}
          onChange={onTargetLangChange}
          dropdownStyle={{ minWidth: 235, borderRadius: '8px' }}
          optionRender={renderOptions}
          popupClassName="!rounded-[8px] shadow-md"
        >
          {LanguageOptions}
        </Select>
      </ConfigProvider>
    </div>
  )
}

export type LanguageSelectProps = Partial<Props> & {
  autoCookies?: boolean
}

const LanguageSelectWrapper: FC<Partial<LanguageSelectProps>> = props => {
  const {
    subLang: externalSubLang,
    targetLang: externalTargetLang,
    onSubLangChange,
    onTargetLangChange,
    detectLang,
    autoCookies = true,
    disabledSubLang = false,
    disabledTargetLang = false,
  } = props
  const [subLang, setSubLang] = useState('auto')
  const locale = useLocale()
  const [targetLang, setTargetLang] = useState('en')

  const setCookies = (value: string) => {
    if (!autoCookies) {
      return
    }
    Cookies.set('selectLang', value)
  }

  useOnce(() => {
    if (autoCookies && !externalTargetLang) {
      setTargetLang(Cookies.get('selectLang') || locale || 'en')
    }
  })

  useEffect(() => {
    if (externalSubLang) {
      setSubLang(externalSubLang)
    }
  }, [externalSubLang])

  useEffect(() => {
    if (externalTargetLang) {
      setTargetLang(externalTargetLang)
      setCookies(externalTargetLang)
    }
  }, [externalTargetLang])

  return (
    <LanguageSelect
      detectLang={detectLang}
      subLang={subLang}
      disabledSubLang={disabledSubLang}
      disabledTargetLang={disabledTargetLang}
      targetLang={targetLang}
      onSubLangChange={v => {
        setSubLang(v)
        onSubLangChange?.(v)
      }}
      onTargetLangChange={v => {
        setTargetLang(v)
        setCookies(v)
        onTargetLangChange?.(v)
      }}
    />
  )
}

export default LanguageSelectWrapper
