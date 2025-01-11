import { Alert, Container, Skeleton, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { TwoPartJoke } from './types/types'
import { FaChevronDown } from 'react-icons/fa';
import useManyJokes from './hooks/useManyJokes'

function App() {

  const {jokes, error, isLoading} = useManyJokes<TwoPartJoke>({
    jokeCategory: "Programming",
    type: "twopart",
    amount: 5
  })

  const skeletonsToRender = [1,2,3,4,5]

  if (error?.response?.data?.error) {
    return <Alert severity="error">{error.response.data.additionalInfo}</Alert>
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  }  

  return (
    <>    
      <Container sx={{p: 5}}>

        <Typography variant='h1'>Jokes!</Typography>

        {isLoading &&    
          skeletonsToRender.map(item => 
          <Skeleton 
            key={item}
            sx={{my: 2}}
            variant="rounded" 
            width={"100%"} 
            height={'50px'}/>
          )
        }

        {jokes?.map(joke => 
        <Accordion sx={{my: 2}} key={joke.id}>
          <AccordionSummary
            expandIcon={<FaChevronDown />}
            aria-controls={`panel${joke.id}-content`}
            id={`panel${joke.id}-header`}
          >
            <Typography sx={{fontWeight: 'bold', color: "primary.main"}} component="span">{joke.setup}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {joke.delivery}
            </Typography>
          </AccordionDetails>
        </Accordion>
        )}

      </Container>
    </>
  )
}

export default App
