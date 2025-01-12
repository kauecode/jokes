import { Backdrop, Button, Typography } from '@mui/material'

interface WinnerScreenProps {
  isVisible: boolean,
  handlePlayAgain: () => void
}

const WinnerScreen = ({isVisible, handlePlayAgain} : WinnerScreenProps) => {
  return (
    <Backdrop
      sx={(theme) => ({ 
        color: '#fff', 
        bgcolor: "#000000E9",
        zIndex: theme.zIndex.drawer + 1,
        flexDirection: "column"
      })}
      open={isVisible}
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