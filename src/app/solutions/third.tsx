import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Colors } from '../../theme/colors'
import { Slimy } from '../../components/solutions/ThirdChallenge/Slimy'
import { styles } from '../../components/solutions/ThirdChallenge/styles'
import { clamp } from 'react-native-redash'
import { useGeneralDimensions } from '../../components/solutions/hooks/useGeneralDimensions'
import { Stack } from 'expo-router'

interface ThirdChallengeProps {
  navigation: NavigationProp<any>
}

const ThirdChallenge: React.FC<ThirdChallengeProps> = () => {
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
    eyes.value = withSequence(
      withTiming(0, { duration: 200 }),
      withTiming(1, { duration: 300 }),
    )
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
    <View style={[styles.flexible, { backgroundColor: Colors.white }]}>
      <Stack.Screen options={{ title: 'Third Challenge' }} />
      <GestureDetector gesture={composedGesture}>
        <Slimy animatedStyle={animatedStyle} eyes={eyes} />
      </GestureDetector>
      <View style={[styles.floor, { width, backgroundColor: Colors.light }]} />
    </View>
  )
}

export default ThirdChallenge
