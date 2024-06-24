import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Colors } from '../../theme/colors'
import { Slimy } from '../../components/solutions/FourthChallenge/Slimy'
import { styles } from '../../components/solutions/FourthChallenge/styles'
import { clamp } from 'react-native-redash'
import { useGeneralDimensions } from '../../components/solutions/hooks/useGeneralDimensions'
import { Stack } from 'expo-router'

interface FourthChallengeProps {
  navigation: NavigationProp<any>
}

const FourthChallenge: React.FC<FourthChallengeProps> = () => {
  const { width } = useWindowDimensions()
  const { LEFT_BOUND, LOWER_BOUND, RIGHT_BOUND, UPPER_BOUND, GROUND } =
    useGeneralDimensions()
  const newX = useSharedValue<number>(0)
  const newY = useSharedValue<number>(GROUND)
  const xlimy = useSharedValue<number>(0)
  const startTranslation = useSharedValue<{
    x: number
    y: number
  }>({
    x: 0,
    y: GROUND,
  })
  const eyes = useSharedValue(1)
  const tapGesture = Gesture.Tap().onStart(() => {
    if (!xlimy.value) {
      eyes.value = withSequence(
        withTiming(0, { duration: 200 }),
        withTiming(1, { duration: 300 }),
      )
    }
  })
  const longPressGesture = Gesture.LongPress().onStart(() => {
    xlimy.value = withTiming(xlimy.value === 1 ? 0 : 1, { duration: 1000 })
    eyes.value = withTiming(xlimy.value)
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
      if (!xlimy.value) {
        eyes.value = withTiming(1, { duration: 700 })
      }
      newY.value = withTiming(GROUND, {
        easing: Easing.bounce,
        duration: 1200,
      })
      startTranslation.value = {
        x: newX.value,
        y: GROUND,
      }
    })
  const composedGesture = Gesture.Simultaneous(
    panGesture,
    tapGesture,
    longPressGesture,
  )
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: newX.value }, { translateY: newY.value }],
    backgroundColor: interpolateColor(
      xlimy.value,
      [0, 1],
      [Colors.slimy, Colors.primary],
    ),
  }))
  return (
    <View style={[styles.flexible, { backgroundColor: Colors.white }]}>
      <Stack.Screen options={{ title: 'Fourth Challenge' }} />
      <GestureDetector gesture={composedGesture}>
        <Slimy animatedStyle={animatedStyle} eyes={eyes} xlimy={xlimy} />
      </GestureDetector>
      <View style={[styles.floor, { width, backgroundColor: Colors.light }]} />
    </View>
  )
}

export default FourthChallenge
