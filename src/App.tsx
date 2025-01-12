import { Container } from '@mui/material'
import useManyJokes from './hooks/useManyJokes'
import { TwoPartJoke } from './types/types'
import Alerts from './components/Alerts'
import LoadingArea from './components/LoadingArea'
import DragDropStage from './components/DragDropStage/DragDropStage'
import HeadingArea from './components/HeadingArea'
import FooterArea from './components/FooterArea'
import { useState } from 'react'

function App() {

  const [roundsPlayed, setRoundsPlayed] = useState(1);

  const {jokes, error, isLoading} = useManyJokes<TwoPartJoke>({
    jokeCategory: "Programming",
    type: "twopart",
    amount: 4
  })

  return (
    <>    
      {error &&
      <Alerts error={error} />}    
            
      <Container sx={{p: 5}}>       

        <HeadingArea />

        {isLoading &&    
        <LoadingArea />}

        {jokes &&
        <DragDropStage jokes={jokes} />}

      </Container>
      <FooterArea />      
    </>
  )
}

export default App
