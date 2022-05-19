import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { Button, useWindowDimensions, View } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import useColors from '../../theme/colors'
import { Slimy } from './Slimy'
import { styles } from './styles'

interface FirstChallengeProps {
  navigation: NavigationProp<any>
}

export const FirstChallenge: React.FC<FirstChallengeProps> = ({}) => {
  const { width } = useWindowDimensions()
  const { colors } = useColors()
  const onPress = () => {
    eyes.value = withTiming(eyes.value === 1 ? 0 : 1)
  }
  const eyes = useSharedValue(0)
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Button title="Open eyes" onPress={onPress} />
      <Slimy eyes={eyes} />
      <View style={[styles.floor, { width, backgroundColor: colors.light }]} />
    </View>
  )
}
