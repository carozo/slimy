import { NavigationProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Colors } from '../../theme/colors'
import { Slimy } from '../../components/solutions/FifthChallenge/Slimy'
import { styles } from '../../components/solutions/FifthChallenge/styles'
import { clamp } from 'react-native-redash'
import { useGeneralDimensions } from '../../components/solutions/hooks/useGeneralDimensions'
import { Stack } from 'expo-router'

interface FifthChallengeProps {
  navigation: NavigationProp<any>
}

const FifthChallenge: React.FC<FifthChallengeProps> = () => {
  const { width } = useWindowDimensions()
  const [counter, setCounter] = useState<number>(0)
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
      newY.value = withTiming(
        GROUND,
        {
          easing: Easing.bounce,
          duration: 1200,
        },
        () => runOnJS(setCounter)(counter + 1),
      )
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
  const colorArray = [
    Colors.white,
    Colors.light,
    Colors.gray,
    Colors.darkerGray,
    Colors.darkerDarkerGray,
    Colors.theLastGray,
    Colors.dark,
    Colors.black,
  ]
  return (
    <View
      style={[styles.flexible, { backgroundColor: colorArray[counter % 8] }]}>
      <Stack.Screen options={{ title: 'Fifth Challenge' }} />
      <GestureDetector gesture={composedGesture}>
        <Slimy animatedStyle={animatedStyle} eyes={eyes} xlimy={xlimy} />
      </GestureDetector>
      <Text
        style={[
          styles.text,
          { color: counter % 8 > 4 ? Colors.white : Colors.black },
        ]}>
        Number of times Slimy has been dropped: {counter}
      </Text>
      <View style={[styles.floor, { width, backgroundColor: Colors.light }]} />
    </View>
  )
}

export default FifthChallenge
