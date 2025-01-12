import { Box, CircularProgress, Skeleton } from "@mui/material"

interface LoadingAreaProps {
  itemsPerColumn: number
}

const LoadingArea = ({itemsPerColumn}:LoadingAreaProps) => {
  return (
    <>
      <Box 
        display="grid"           
        padding={3}
        gridTemplateColumns={{ xs: "1fr", md: "3fr 1fr 3fr" }} 
        gap={5}
      > 
        <Box>
          {Array.from({ length: itemsPerColumn }).map((_, i) => 
            <Skeleton 
              key={i}
              sx={{my: 2}}
              variant="rounded" 
              width={"100%"} 
              height={'80px'}/>
          )}          
        </Box>
        <Box textAlign={"center"} padding={5}>
          <CircularProgress />
        </Box>            
        <Box>
          {Array.from({ length: itemsPerColumn }).map((_, i) => 
            <Skeleton 
              key={i}
              sx={{my: 2}}
              variant="rounded" 
              width={"100%"} 
              height={'80px'}/>
          )}          
        </Box>
      </Box>   
    </>
  )
}

export default LoadingArea