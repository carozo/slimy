import { Theme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import 'react-native-reanimated'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Colors } from '../theme/colors'

export default function RootLayout() {
  const theme: Theme = {
    colors: {
      background: Colors.light,
      card: Colors.white,
      border: Colors.light,
      notification: Colors.primary,
      primary: Colors.primary,
      text: Colors.black,
    },
    dark: false,
  }
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={theme}>
        <Stack />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
