import { Theme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import 'react-native-reanimated'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import useColors from '../theme/colors'

export default function RootLayout() {
  const { colors, isDark } = useColors()

  const theme: Theme = {
    colors: {
      background: colors.light,
      card: colors.white,
      border: colors.light,
      notification: colors.primary,
      primary: colors.primary,
      text: colors.black,
    },
    dark: isDark,
  }
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={theme}>
        <Stack />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
