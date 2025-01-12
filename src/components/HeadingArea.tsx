import { Box, Typography } from '@mui/material'

const HeadingArea = () => {
  return (
    <Box sx={{p:3}}>
      <Typography variant='h3'>Jokes!</Typography>        
      <Typography variant="h6" sx={{ mb: 2 }}>Instructions</Typography>
      <ul>
        <li>Drag and drop the <strong>questions</strong> (Left) into their respective <strong>answers</strong> (Right).</li>
        <li>Match the items by dragging them from the left column and dropping them onto the correct response in the right column.</li>
        <li><strong>Note:</strong> This version is not touch/mobile friendly.</li>
      </ul>
    </Box>
  )
}

export default HeadingArea