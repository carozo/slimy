import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import useColors from '../../theme/colors'
import { Slimy } from './Slimy'
import { styles } from './styles'
import { useGeneralDimensions } from '../../hooks/useGeneralDimensions'

interface SecondChallengeProps {
  navigation: NavigationProp<any>
}

export const SecondChallenge: React.FC<SecondChallengeProps> = ({}) => {
  const { colors } = useColors()
  const { width } = useWindowDimensions()
  const { GROUND } = useGeneralDimensions()
  const translation = useSharedValue<{ x: number; y: number }>({
    x: 0,
    y: GROUND,
  })
  const startTranslation = useSharedValue<{ x: number; y: number }>({
    x: 0,
    y: GROUND,
  })

  const eyes = useSharedValue(1)
  const tapGesture = Gesture.Tap().onStart(() => {
    eyes.value = withSequence(
      withTiming(0, { duration: 200 }),
      withTiming(1, { duration: 300 }),
    )
    // eyes.value = withTiming(0, { duration: 200 })
  })
  const panGesture = Gesture.Pan()
    .onStart(() => {
      eyes.value = withTiming(0, { duration: 100 })
    })
    .onUpdate(({ translationX, translationY }) => {
      translation.value = {
        x: translationX + startTranslation.value.x,
        y: translationY + startTranslation.value.y,
      }
    })
    .onEnd(() => {
      eyes.value = withTiming(1, { duration: 700 })
      startTranslation.value = {
        x: translation.value.x,
        y: translation.value.y,
      }
    })
  const composedGesture = Gesture.Simultaneous(panGesture, tapGesture)
  return (
    <View style={[styles.flexible, { backgroundColor: colors.white }]}>
      <GestureDetector gesture={composedGesture}>
        <Slimy eyes={eyes} translation={translation} />
      </GestureDetector>
      <View style={[styles.floor, { width, backgroundColor: colors.light }]} />
    </View>
  )
}
