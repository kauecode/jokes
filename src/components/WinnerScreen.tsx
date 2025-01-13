import { Backdrop, Box, Button, keyframes, Typography } from '@mui/material'
import useAppStore from '../stores/app.store';
import { GiPartyPopper } from 'react-icons/gi';

const WinnerScreen = () => {

  const increaseRoundsPlayed = useAppStore(s => s.increaseRoundsPlayed);    
  const winner = useAppStore(s => s.winner);   
  const setWinner = useAppStore(s => s.setWinner);    

  const handlePlayAgain = () => {
    increaseRoundsPlayed();
    setWinner(false);
  }

  const shake = keyframes`
    0% { transform: translateX(0); }
    25% { transform: translateY(-5px); }
    50% { transform: translateX(5px) scale(1.2); }
    75% { transform: translateY(-5px); }
    100% { transform: translateX(0); }`;  

  return (
    <>
      <Backdrop
        sx={(theme) => ({ 
          color: '#fff', 
          bgcolor: "#000000E9",
          zIndex: theme.zIndex.drawer + 1,
          flexDirection: "column"
        })}
        open={winner}
      >
        <Box>
          <GiPartyPopper size={150}/>
        </Box>        
        <Typography 
          variant='h1' 
          sx={{ 
            fontSize: {xs: '2rem', sm:'3rem'},
            mt:5, 
            animation: `${shake} 0.7s ease-in-out infinite`
          }}> 
          Winner! Gagnant!
        </Typography>
        <Typography mt={0} mb={5}> You have matched all jokes! </Typography>
        <Button variant='contained' onClick={handlePlayAgain}>
          Play again?
        </Button>

      </Backdrop>    
    </>
  )
}

export default WinnerScreen