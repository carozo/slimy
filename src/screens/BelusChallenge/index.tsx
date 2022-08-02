import { NavigationProp } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useWindowDimensions, View } from 'react-native'
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import useColors from '../../theme/colors'
import { Slimy } from './Slimy'
import { styles } from './styles'
import { clamp } from 'react-native-redash'
import { useGeneralDimensions } from '../../hooks/useGeneralDimensions'

interface BelusChallengeProps {
  navigation: NavigationProp<any>
}

export const BelusChallenge: React.FC<BelusChallengeProps> = ({}) => {
  const { colors } = useColors()
  const { width, height } = useWindowDimensions()
  const { LEFT_BOUND, LOWER_BOUND, RIGHT_BOUND, UPPER_BOUND, GROUND } =
    useGeneralDimensions()
  const newX = useSharedValue<number>((width - 150) / 2)
  const newY = useSharedValue<number>(GROUND)
  const xlimy = useSharedValue<number>(0)
  const fruitScale = useSharedValue<number>(1)
  const fruitPositionX = useSharedValue<number>(100)
  const fruitPositionY = useSharedValue<number>(0)
  const startTranslation = useSharedValue<{
    x: number
    y: number
  }>({
    x: (width - 150) / 2,
    y: GROUND,
  })
  const eyes = useSharedValue(1)
  const mouth = useSharedValue(0)
  // const isInDeleteZone = (actualYPosition: number) => {
  //   'worklet'
  //   return (
  //     actualYPosition >= height - DELETE_ZONE_HEIGHT &&
  //     actualYPosition <= height
  //   )
  // }
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
        0,
        width - 150,
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
      [colors.slimy, colors.primary],
    ),
  }))
  const fruitStyle = useAnimatedStyle(() => ({
    zIndex: 100,
    transform: [
      //TODO: ver como hacer bien el scale
      { scale: fruitScale.value },
      { translateX: fruitPositionX.value },
      { translateY: fruitPositionY.value },
    ],
    backgroundColor: 'red',
    width: 50,
    height: 50,
  }))
  useEffect(() => {
    fruitPositionY.value = withTiming(height, { duration: 6000 })
  })
  useAnimatedReaction(
    () => {
      return fruitPositionY.value
    },
    () => {
      if (
        fruitPositionY.value > newY.value + 75 &&
        fruitPositionX.value >= newX.value + 15 &&
        fruitPositionX.value <= newX.value + 85
      ) {
        fruitScale.value = 0
        mouth.value = withTiming(0)
        fruitPositionY.value = 0
        fruitPositionY.value = -50
        fruitPositionX.value = Math.random() * (width - 150) + 75
        fruitPositionY.value = withTiming(height, { duration: 6000 })
        fruitScale.value = 1
      }

      if (
        fruitPositionY.value > newY.value - 120 &&
        fruitPositionY.value < newY.value &&
        fruitPositionX.value > newX.value - 120 &&
        fruitPositionX.value < newX.value + 120
      ) {
        mouth.value = withTiming(1)
      } else if (fruitPositionY.value > newY.value + 30) {
        mouth.value = withTiming(0)
      }

      if (fruitPositionY.value === height) {
        fruitScale.value = 1
        fruitPositionY.value = -50
        fruitPositionY.value = withTiming(height, { duration: 6000 })
        fruitPositionX.value = Math.random() * (width - 150) + 75
      }
    },
    [fruitPositionY.value],
  )
  return (
    <View
      style={[
        styles.flexible,
        {
          backgroundColor: colors.white,
        },
      ]}>
      <Animated.View style={fruitStyle} />
      <GestureDetector gesture={composedGesture}>
        <Slimy
          animatedStyle={animatedStyle}
          eyes={eyes}
          xlimy={xlimy}
          mouth={mouth}
        />
      </GestureDetector>
      <View style={[styles.floor, { width, backgroundColor: colors.light }]} />
    </View>
  )
}
