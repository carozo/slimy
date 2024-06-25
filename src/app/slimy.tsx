import React from 'react'
import { Slimy } from '../components/Slimy'
import { Stack } from 'expo-router'
import { Scenery } from '../components/Scenery'

const YourSlimyScreen = () => {
  return (
    <Scenery>
      <Stack.Screen options={{ title: 'My Slimy' }} />
      <Slimy />
    </Scenery>
  )
}

export default YourSlimyScreen
