import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { ScrollView } from 'react-native'
import { MenuItem } from './MenuItem'

interface HomeProps {
  navigation: NavigationProp<any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <MenuItem
        title="First challenge"
        onPress={() => navigation.navigate('FirstChallenge')}
      />
      <MenuItem
        title="Second challenge"
        onPress={() => navigation.navigate('SecondChallenge')}
      />
      <MenuItem
        title="Third challenge"
        onPress={() => navigation.navigate('ThirdChallenge')}
      />
      <MenuItem
        title="Fourth challenge"
        onPress={() => navigation.navigate('FourthChallenge')}
      />
    </ScrollView>
  )
}
