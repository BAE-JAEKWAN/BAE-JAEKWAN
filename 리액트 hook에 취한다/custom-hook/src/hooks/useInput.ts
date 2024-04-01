import { useState } from 'react'

export const useInput = (
  initialValue: string,
  submitAction?: (value: string) => void
) => {
  const [InputValue, setInputValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (value: string) => {
    submitAction && submitAction(value)
  }

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string
  ) => {
    if (submitAction && e.key === 'Enter') submitAction(value)
  }

  return { InputValue, handleChange, handleSubmit, handleEnter }
}
