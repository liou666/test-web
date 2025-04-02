type Preload = {
  name: string
  [key: string]: string
}
export const send =async (preload: Preload) => {
  try {
  const res = await navigator.clipboard.writeText(JSON.stringify(preload))
  return res
  } catch (error) {
    console.error(error)
  }
}
