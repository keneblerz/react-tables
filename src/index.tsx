import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import App from './components/App'
import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline, StyledEngineProvider } from '@mui/material'
import { darkTheme } from './configs/default-theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <StyledEngineProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <App />
        </StyledEngineProvider>
      </Box>
    </ThemeProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
