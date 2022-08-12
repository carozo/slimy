import { NavigationProp } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useWindowDimensions, View, Text } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
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
import { clamp, mix } from 'react-native-redash'
import { useGeneralDimensions } from '../../hooks/useGeneralDimensions'
import { Lives } from './Lives'

interface BelusChallengeProps {
  navigation: NavigationProp<any>
}

export const BelusChallenge: React.FC<BelusChallengeProps> = ({}) => {
  const won = useSharedValue<number>(0)
  const background = useSharedValue<number>(0)
  const { colors } = useColors()
  const { width, height } = useWindowDimensions()
  const { LOWER_BOUND, UPPER_BOUND, GROUND } = useGeneralDimensions()
  const newX = useSharedValue<number>((width - 150) / 2)
  const newY = useSharedValue<number>(GROUND)
  const hunger = useSharedValue<number>(0)
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
  const barStyle = useAnimatedStyle(() => {
    return {
      width: `${interpolate(hunger.value, [0, 10], [7, 100])}%`,
      backgroundColor: interpolateColor(
        hunger.value,
        [0, 10],
        [colors.primary, colors.slimy],
      ),
    }
  })
  const bgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: won.value ? '#7c9c88' : 'white',
    }
  })
  const textStyle = useAnimatedStyle(() => {
    return { opacity: withTiming(won.value, { duration: 2000 }) }
  })
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: mix(background.value, 0, 2.5),
        },
      ],
      borderRadius: 300,
      // width: withTiming(mix(background.value, 0, height), { duration: 700 }),
      // height: withTiming(mix(background.value, 0, height), { duration: 700 }),
      width,
      overflow: 'hidden',
      height: width,
    }
  })
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
    fruitPositionY.value = withTiming(height, { duration: 4000 })
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
        //Eats the fruit
        fruitScale.value = 0
        mouth.value = withTiming(0)
        fruitPositionY.value = 0
        fruitPositionY.value = -50
        hunger.value = withTiming(hunger.value + 1)
        if (hunger.value < 9) {
          fruitPositionX.value = Math.random() * (width - 150) + 75
          fruitPositionY.value = withTiming(height, { duration: 2000 })
          fruitScale.value = 1
        } else {
          //wins
          mouth.value = withTiming(0)
          background.value = withTiming(1, { duration: 2000 }, () => {
            won.value = 1
            background.value = withTiming(0)
          })
        }
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
        fruitPositionY.value = withTiming(height, { duration: 4000 })
        fruitPositionX.value = Math.random() * (width - 150) + 75
      }
    },
    [fruitPositionY.value],
  )
  return (
    <Animated.View style={[styles.flexible, bgStyle]}>
      <Animated.View
        style={[
          backgroundStyle,
          {
            backgroundColor: '#7c9c88',
            zIndex: -1,
            position: 'absolute',
          },
        ]}></Animated.View>
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
      <Animated.View
        style={{
          backgroundColor: colors.light,
          borderRadius: 10,
          height: 20,
          marginHorizontal: 60,
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingHorizontal: 5,
          zIndex: -1,
        }}>
        <Animated.View
          style={[
            barStyle,
            {
              height: 13,
              borderRadius: 10,
              shadowOpacity: 0.1,
              shadowOffset: {
                height: 1,
                width: 0,
              },
            },
          ]}>
          <></>
        </Animated.View>
      </Animated.View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
          backgroundColor: 'teal',
        }}>
        <Lives />
      </View>
      <Animated.View
        style={[
          textStyle,
          {
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 60,
            zIndex: -2,
          },
        ]}>
        <Text style={styles.text}>YOU WON!</Text>
        <Text style={styles.text2}>CONGRATULATIONS</Text>
      </Animated.View>
    </Animated.View>
  )
}
