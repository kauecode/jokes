import { Box, CircularProgress, Skeleton } from "@mui/material"

const LoadingArea = () => {
  return (
    <>
      <Box 
        display="grid"           
        padding={3}
        gridTemplateColumns={{ xs: "1fr", md: "3fr 1fr 3fr" }} 
        gap={5}
      > 
        <Skeleton 
          sx={{m: 0}}
          variant="rounded" 
          width={"100%"} 
          height={'100vh'}/>
        <Box textAlign={"center"} padding={5}>
          <CircularProgress />
        </Box>            
        <Skeleton 
          sx={{m: 0}}
          variant="rounded" 
          width={"100%"} 
          height={'100vh'}/>
      </Box>   
    </>
  )
}

export default LoadingArea