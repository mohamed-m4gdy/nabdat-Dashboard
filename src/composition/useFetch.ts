// Resuable Fetch To Edit it Easy When We Need To Add Token
const useFetch = async ({
  url,
  headers,
  method,
  body,
}: {
  url: string
  headers?: any
  method?: string
  body?: any
}) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  })

  if (method !== 'DELETE') {
    return {
      data: await response.json(),
    }
  }
}

export default useFetch
