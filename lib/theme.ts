import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { mode, Styles } from "@chakra-ui/theme-tools"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const colors = {
  mint: {
    text: "#3a606e"
  }
}

const styles: Styles  = {
  global: (props) => ({
    body: {
      color: mode("mint.text", "whiteAlpha.900")(props)
    }
  })
}

const theme = extendTheme({
  styles,
  config,
  colors
})

export default theme