import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { Button, useWindowDimensions, View } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { Colors } from '../../theme/colors'
import { Slimy } from '../../components/FirstChallenge/Slimy'
import { styles } from '../../components/FirstChallenge/styles'
import { Stack } from 'expo-router'

interface FirstChallengeProps {
  navigation: NavigationProp<any>
}

const FirstChallenge: React.FC<FirstChallengeProps> = () => {
  const { width } = useWindowDimensions()
  const onPress = () => {
    eyes.value = withTiming(eyes.value === 1 ? 0 : 1)
  }
  const eyes = useSharedValue(0)
  return (
    <View style={[styles.flexible, { backgroundColor: Colors.white }]}>
      <Stack.Screen options={{ title: 'First Challenge' }} />
      <Button title="Open eyes" onPress={onPress} />
      <Slimy eyes={eyes} />
      <View style={[styles.floor, { width, backgroundColor: Colors.light }]} />
    </View>
  )
}

export default FirstChallenge
