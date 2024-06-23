import React from 'react'
import { ScrollView } from 'react-native'
import { router, Stack } from 'expo-router'
import { MenuItem } from '../components/Home/MenuItem'

const Home = () => {
  return (
    <ScrollView>
      <Stack.Screen options={{ title: 'Home' }} />
      <MenuItem
        title="First challenge"
        onPress={() => router.navigate('solutions/first')}
      />
      <MenuItem
        title="Second challenge"
        onPress={() => router.navigate('solutions/second')}
      />
      <MenuItem
        title="Third challenge"
        onPress={() => router.navigate('solutions/third')}
      />
      <MenuItem
        title="Fourth challenge"
        onPress={() => router.navigate('solutions/fourth')}
      />
      <MenuItem
        title="Fifth challenge"
        onPress={() => router.navigate('solutions/fifth')}
      />
      <MenuItem
        title="Belu's challenge"
        onPress={() => router.navigate('solutions/belus')}
      />
    </ScrollView>
  )
}

export default Home
