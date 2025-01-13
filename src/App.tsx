import { Container } from '@mui/material'
import useManyJokes from './hooks/useManyJokes'
import { TwoPartJoke } from './types/types'
import Alerts from './components/Alerts'
import LoadingArea from './components/LoadingArea'
import DragDropStage from './components/DragDropStage/DragDropStage'
import HeadingArea from './components/HeadingArea'
import FooterArea from './components/FooterArea'
import WinnerScreen from './components/WinnerScreen'

function App() {  

  // How many jokes should we fetch?
  // Used for loading skeletons as well
  const JOKES_TO_LOAD = 7;

  // All params in this hook are optional, used to fetch the jokes from the API
  const {jokes, error, isLoading} = useManyJokes<TwoPartJoke>({
    jokeCategory: "Programming",
    type: "twopart",
    amount: JOKES_TO_LOAD
  })

  return (
    <>    
      {error &&
        <Alerts error={error} />}                
      <Container sx={{p: {xs: 2, sm: 5}}}>
        <HeadingArea />
        {isLoading &&    
          <LoadingArea itemsPerColumn={JOKES_TO_LOAD}/>}
        {jokes &&
          <DragDropStage jokes={jokes} />}
      </Container>
      <FooterArea />      
      <WinnerScreen/>
    </>
  )
}

export default App
