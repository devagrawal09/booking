export const myFetch = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options)
  const data = await res.json();
  if (res.ok) {
    return data
  } else {
    throw new Error(data.message)
  }
}