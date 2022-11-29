import React from 'react'
import { ChakraProvider, extendTheme, withDefaultSize } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { Editor } from './editor'
import './style/index.css'

const customTheme = extendTheme(
  withDefaultSize({
    size: 'xs',
    components: ['Button', 'Badge', 'Heading'],
  }),
)

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Editor />
    </ChakraProvider>
  </React.StrictMode>,
)
