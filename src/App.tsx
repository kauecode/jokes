import './App.css'
import useManyJokes from './hooks/useManyJokes'
import { TwoPartJoke } from './types/types'

function App() {

  // Use this for single jokes
  // Options can be a empty obj to use defaults
  // const {joke, error, isLoading} = useSingleJoke<TwoPartJoke>({
  //   jokeCategory: "Programming",
  //   type: "twopart"
  // })

  // Use this for multiple jokes
  // Options can be a empty obj to use defaults  
  const {jokes, error, isLoading} = useManyJokes<TwoPartJoke>({
    jokeCategory: "Programming",
    type: "twopart",
    amount: 5
  })

  if (error?.response?.data) {
    return <p>{error.response.data.additionalInfo}</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }  

  if (isLoading) {
    return <p>Loading, please wait...</p>
  }  

  return (
    <>
      <h1>Jokes!</h1>
      {/* Use this when fetching from useManyJokes */}
      {jokes?.map(joke => 
        <p key={joke.id}>{joke.setup} / {joke.delivery}</p>
      )}
      {/* Use this for useSingleJoke */}
      {/* <p key={joke?.id}>{joke?.setup} / {joke?.delivery}</p> */}
    </>
  )
}

export default App
