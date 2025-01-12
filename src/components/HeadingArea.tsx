import { Box, Chip, Typography } from '@mui/material'
import useAppStore from '../stores/app.store';

const HeadingArea = () => {

  const roundsPlayed = useAppStore(s => s.roundsPlayed);  

  return (
    <Box sx={{p:3, textAlign: 'center'}}>            
      <Typography variant='h3' sx={{m:3}}>Jokes!</Typography>        
      <Typography variant="h6">Drag and drop the <strong>questions</strong> (Left Column) into their respective <strong>answers</strong> (Right Column).</Typography>            
      <Typography sx={{textAlign: 'center'}} variant='h6'>You have played <Chip sx={{fontWeight: 600}} label={roundsPlayed} color="primary" /> rounds.</Typography>
      <Typography sx={{m:2, opacity: 0.3}}>This version is not touch/mobile friendly.</Typography>
    </Box>
  )
}

export default HeadingArea