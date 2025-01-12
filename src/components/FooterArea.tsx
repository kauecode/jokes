import { Box, Typography } from '@mui/material'
import Link from '@mui/material/Link';
import { FaCanadianMapleLeaf } from 'react-icons/fa'

const FooterArea = () => {
  return (
    <Box sx={{
      bgcolor: "#0280801c",
      textAlign: "center",
      width: 1,
      p: 5
    }}>
      <Typography>
        Made in Toronto <FaCanadianMapleLeaf color='#008080' style={{display: "inline"}}/> Canada by <Link href='https://kaue.ca' target="_blank">Kaue</Link>            
        &nbsp;•&nbsp;This is a test project, you can find the <Link href='https://github.com/kauecode/' target="_blank">source code here</Link>.
      </Typography>
    </Box>
  )
}

export default FooterArea