import { useLocalStorageState, useMount } from 'ahooks'
import clsx from 'clsx'
import React, { useState } from 'react'

export default function Result() {
  const [isExpend, setIsExpend] = useState(false)

  const [text, setText] = useLocalStorageState('select_text', {
    defaultValue: '',
    listenStorageChange: true,
  })

  function randomText() {
    return Math.random().toString(36).substring(2, 15)
  }
  useMount(async () => {})

  return (
    <div className="h-full w-full flex flex-col gap-4 p-3 min-w-[300px] min-h-[300px]">
      <div
        className={clsx(
          'border border-gray-300 rounded-md p-2 cursor-pointer w-full',
          isExpend ? 'max-h-[100px] overflow-y-auto' : 'truncate'
        )}
        onClick={() => setIsExpend(!isExpend)}
      >
        {text}
      </div>
      {/* <CustomScroll className=" max-h-[calc(100%-200px)] "> */}
         {text}
      {/* </CustomScroll> */}
      {/* <div>123</div> */}
      <div className="flex justify-between mt-auto">
        <div></div>
        <button>copy</button>
      </div>
    </div>
  )
}
