import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: "#008080" },
    secondary: { main: "#82b25a"},
    background: {
      default: "#eef7f3",
      paper: "#ffffff"
    }    
  },
  typography: {
    allVariants: { fontFamily: "Roboto, Helvetica, Arial, sans-serif" },
    h1: { fontSize: "3.4rem" },  
    h2: { fontSize: "2.6rem" },
    h3: { fontSize: "2.2rem" },  
    h4: { fontSize: "1.8rem" },
    h5: { fontSize: "1.5rem" },
    h6: { fontSize: "1.2rem" }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
