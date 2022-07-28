import { NavigationContainer, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BelusChallenge } from '../screens/BelusChallenge'
import { FifthChallenge } from '../screens/FifthChallenge'
import { FirstChallenge } from '../screens/FirstChallenge'
import { FourthChallenge } from '../screens/FourthChallenge'

import { Home } from '../screens/home'
import { SecondChallenge } from '../screens/SecondChallenge'
import { ThirdChallenge } from '../screens/ThirdChallenge'
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
        <Stack.Screen name="SecondChallenge" component={SecondChallenge} />
        <Stack.Screen name="ThirdChallenge" component={ThirdChallenge} />
        <Stack.Screen name="FourthChallenge" component={FourthChallenge} />
        <Stack.Screen name="FifthChallenge" component={FifthChallenge} />
        <Stack.Screen name="BelusChallenge" component={BelusChallenge} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
