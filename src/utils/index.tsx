type Preload = {
  name: string
  [key: string]: string
}
export const send =async (preload: Preload) => {
  try {
    // @ts-ignore
  const res = await navigator.clipboard.veles(JSON.stringify(preload))
  return res
  } catch (error) {
    console.error(error)
  }
}
