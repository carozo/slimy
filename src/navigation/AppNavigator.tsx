import { NavigationContainer, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FirstChallenge } from '../screens/FirstChallenge'

import { Home } from '../screens/home'
import useColors from '../theme/colors'

const Stack = createNativeStackNavigator()

const AppNavigator: React.FC = () => {
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
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FirstChallenge" component={FirstChallenge} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
