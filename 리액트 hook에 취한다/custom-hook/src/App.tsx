import './App.css'
import { useInput } from './hooks/useInput'
import { useFetch } from './hooks/useFetch'

function App() {
  const displayMessage = (message: string) => {
    alert(message)
  }

  const { InputValue, handleChange, handleSubmit, handleEnter } = useInput(
    '',
    displayMessage
  )
  const { InputValue: InputValue2, handleChange: handleChange2 } = useInput('')

  const baseUrl = 'https://jsonplaceholder.typicode.com/'

  const { ApiData, ApiType, setApiType, fetchData, fetchEnter } =
    useFetch(baseUrl)

  return (
    <>
      <h2>useInput</h2>
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

      <h2>useFetch</h2>
      <input
        type="text"
        value={ApiType}
        onChange={e => {
          setApiType(e.target.value)
        }}
        onKeyDown={e => {
          fetchEnter(e, ApiType)
        }}
      />
      <button
        type="button"
        onClick={() => {
          fetchData(ApiType)
        }}
      >
        확인
      </button>
      <pre>{JSON.stringify(ApiData, null, 2)}</pre>
    </>
  )
}

export default App
