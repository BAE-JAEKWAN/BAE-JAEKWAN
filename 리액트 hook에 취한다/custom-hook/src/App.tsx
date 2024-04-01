import './App.css'
import { useInput } from './hooks/useInput'

function App() {
  const displayMessage = (message: string) => {
    alert(message)
  }

  const { InputValue, handleChange, handleSubmit, handleEnter } = useInput(
    '',
    displayMessage
  )
  const { InputValue: InputValue2, handleChange: handleChange2 } = useInput('')

  return (
    <>
      <h1>useInput</h1>
      <div>
        <input
          type="text"
          value={InputValue} // ts(2322)
          onChange={handleChange} // ts(2322)
          onKeyDown={e => {
            handleEnter(e, InputValue)
          }}
        />
        <button
          type="button"
          onClick={() => {
            handleSubmit(InputValue)
          }}
        >
          확인
        </button>
      </div>
      <div>
        <input
          type="text"
          value={InputValue2} // ts(2322)
          onChange={handleChange2} // ts(2322)
          onKeyDown={e => {
            handleEnter(e, InputValue2)
          }}
        />
        <button
          type="button"
          onClick={() => {
            handleSubmit(InputValue2)
          }}
        >
          확인
        </button>
      </div>
    </>
  )
}

export default App
