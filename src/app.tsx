import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import Navigations from '@/navigations'
import { ThemeProvider } from '@shopify/restyle'
import theme from './themes'

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Navigations />
      </ThemeProvider>
    </NavigationContainer>
  )
}

export default App
