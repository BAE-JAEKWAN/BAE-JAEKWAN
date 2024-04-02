import { useState } from 'react'

export const useFetch = (baseUrl: string, initialValue?: string) => {
  const [ApiType, setApiType] = useState(initialValue ?? 'users')
  const [ApiData, setApiData] = useState([])

  const fetchData = (type: string) => {
    fetch(baseUrl + type)
      .then(res => res.json())
      .then(data => {
        setApiData(data)
      })
      .catch(error => console.log(error))
  }

  const fetchEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string
  ) => {
    if (e.key === 'Enter') fetchData(value)
  }

  return { ApiData, ApiType, setApiType, fetchData, fetchEnter }
}
