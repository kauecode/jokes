import { Alert, Box } from "@mui/material"
import { AxiosError } from "axios"
import { FetchResponseError } from "../types/types";

interface AlertsProps {
  error: AxiosError<FetchResponseError>
}

const Alerts = ({error} : AlertsProps) => {

  const message = error?.response?.data?.error 
    ? error?.response?.data?.message
    : error.message

    console.log(message)

  return (
    <>
      <Box sx={{
        position: 'absolute', 
        width: 1,
        top: 0,
        }}>
          <Alert severity="error">{message}</Alert>
      </Box>
    </>
    
  )
}

export default Alerts