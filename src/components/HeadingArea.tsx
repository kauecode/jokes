import { Box, Chip, Typography } from '@mui/material'
import useAppStore from '../stores/app.store';

const HeadingArea = () => {

  const roundsPlayed = useAppStore(s => s.roundsPlayed);  

  return (
    <Box sx={{p:3, textAlign: 'center'}}>            
      <Typography variant='h3' sx={{m:3}}>Jokes!</Typography>        
      <Typography 
        variant="h6" 
        sx={{ 
          display: { 
            xs: "none", 
            md: "block" } 
        }}>Drag and drop the <strong>setup</strong> (Left Column) into their respective <strong>delivery</strong> (Right Column).</Typography>            
      <Typography
        variant="h6" 
        sx={{ 
          display: { 
            xs: "block", 
            md: "none" 
        }}}>Drag and drop the <strong>setup</strong> (Top Column) into their respective <strong>delivery</strong> (Bottom Column).
      </Typography>                  
      <Typography sx={{textAlign: 'center', mt: 2}} variant='h6'>You have played <Chip sx={{fontWeight: 600}} label={roundsPlayed} color="primary" /> rounds.</Typography>
    </Box>
  )
}

export default HeadingArea