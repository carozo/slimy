import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import useColors from '../../theme/colors'
import { Slimy } from './Slimy'
import { styles } from './styles'
import { clamp } from 'react-native-redash'
import { useGeneralDimensions } from '../../hooks/useGeneralDimensions'

interface ThirdChallengeProps {
  navigation: NavigationProp<any>
}

export const ThirdChallenge: React.FC<ThirdChallengeProps> = ({}) => {
  const { colors } = useColors()
  const { width } = useWindowDimensions()
  const { LEFT_BOUND, LOWER_BOUND, RIGHT_BOUND, UPPER_BOUND, GROUND } =
    useGeneralDimensions()
  const newX = useSharedValue<number>(0)
  const newY = useSharedValue<number>(GROUND)
  const startTranslation = useSharedValue<{ x: number; y: number }>({
    x: 0,
    y: GROUND,
  })
  const eyes = useSharedValue(1)
  const tapGesture = Gesture.Tap().onStart(() => {
    eyes.value = withTiming(0, { duration: 200 }, () => {
      eyes.value = withTiming(1, { duration: 300 })
    })
  })
  const panGesture = Gesture.Pan()
    .onStart(() => {
      eyes.value = withTiming(0, { duration: 100 })
    })
    .onUpdate(({ translationX, translationY }) => {
      Math.abs(translationY)
      newX.value = clamp(
        translationX + startTranslation.value.x,
        LEFT_BOUND,
        RIGHT_BOUND,
      )
      newY.value = clamp(
        translationY + startTranslation.value.y,
        UPPER_BOUND,
        LOWER_BOUND + 70,
      )
    })
    .onEnd(() => {
      eyes.value = withTiming(1, { duration: 700 })
      newY.value = withTiming(GROUND, {
        easing: Easing.bounce,
        duration: 1200,
      })
      startTranslation.value = {
        x: newX.value,
        y: GROUND,
      }
    })
  const composedGesture = Gesture.Simultaneous(panGesture, tapGesture)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: newX.value }, { translateY: newY.value }],
  }))
  return (
    <View style={[styles.flexible, { backgroundColor: colors.white }]}>
      <GestureDetector gesture={composedGesture}>
        <Slimy animatedStyle={animatedStyle} eyes={eyes} />
      </GestureDetector>
      <View style={[styles.floor, { width, backgroundColor: colors.light }]} />
    </View>
  )
}
