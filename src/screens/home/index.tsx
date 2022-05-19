import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenProps } from 'react-native-screens'
import { MenuItem } from './MenuItem'
import { styles } from './styles'

interface HomeProps {
  navigation: NavigationProp<any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <MenuItem
        title="Initial"
        onPress={() => navigation.navigate('FirstChallenge')}
      />
    </ScrollView>
  )
}
