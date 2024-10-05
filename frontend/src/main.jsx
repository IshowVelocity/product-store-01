import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
         <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
)