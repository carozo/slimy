import { NavigationProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import {
  Easing,
  interpolateColor,
  runOnJS,
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
import { Text } from 'react-native'

interface FifthChallengeProps {
  navigation: NavigationProp<any>
}

export const FifthChallenge: React.FC<FifthChallengeProps> = ({}) => {
  const { colors } = useColors()
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
      eyes.value = withTiming(0, { duration: 200 }, () => {
        eyes.value = withTiming(1, { duration: 300 })
      })
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
      [colors.slimy, colors.primary],
    ),
  }))
  const colorArray = [
    colors.white,
    colors.light,
    colors.gray,
    colors.darkerGray,
    colors.darkerDarkerGray,
    colors.theLastGray,
    colors.dark,
    colors.black,
  ]
  return (
    <View
      style={[styles.flexible, { backgroundColor: colorArray[counter % 8] }]}>
      <GestureDetector gesture={composedGesture}>
        <Slimy animatedStyle={animatedStyle} eyes={eyes} xlimy={xlimy} />
      </GestureDetector>
      <Text
        style={[
          styles.text,
          { color: counter % 8 > 4 ? colors.white : colors.black },
        ]}>
        Number of times Slimy has been dropped: {counter}
      </Text>
      <View style={[styles.floor, { width, backgroundColor: colors.light }]} />
    </View>
  )
}
