import { ThemeProvider } from "styled-components"
import { MainPage } from "./pages/mainPage"
import { Service } from './services/service'
import { ServiceContext } from './services/context'
import { API_ENDPOINT } from './constants/index'
import { defaultTheme } from './uiKit/theme'

function App() {
  const service = new Service(API_ENDPOINT)

  return (
    <ServiceContext.Provider value={service}>
      <ThemeProvider theme={defaultTheme}>
        <MainPage/>
      </ThemeProvider>
    </ServiceContext.Provider>
  )
}

export default App
