import { Backdrop, Button, Typography } from '@mui/material'
import useAppStore from '../stores/app.store';

const WinnerScreen = () => {

  const increaseRoundsPlayed = useAppStore(s => s.increaseRoundsPlayed);    
  const winner = useAppStore(s => s.winner);   
  const setWinner = useAppStore(s => s.setWinner);    

  const handlePlayAgain = () => {
    increaseRoundsPlayed();
    setWinner(false);
  }

  return (
    <Backdrop
      sx={(theme) => ({ 
        color: '#fff', 
        bgcolor: "#000000E9",
        zIndex: theme.zIndex.drawer + 1,
        flexDirection: "column"
      })}
      open={winner}
    >
      <Typography variant='h1'> Winner!!! </Typography>
      <Typography mt={0} mb={5}> You have matched all jokes! </Typography>
      <Button variant='contained' onClick={handlePlayAgain}>
        Play again?
      </Button>

    </Backdrop>    
  )
}

export default WinnerScreen