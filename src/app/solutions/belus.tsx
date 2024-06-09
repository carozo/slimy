import { NavigationProp } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useWindowDimensions, View, Text, Image } from 'react-native'
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
import useColors, { LightColors } from '../../theme/colors'
import { Slimy } from '../../components/BelusChallenge/Slimy'
import { styles } from '../../components/BelusChallenge/styles'
import { clamp, mix } from 'react-native-redash'
import { useGeneralDimensions } from '../../hooks/useGeneralDimensions'
import { Lives } from '../../components/BelusChallenge/Lives'
import { Stack } from 'expo-router'
import Avocado from '../../../assets/images/food/avocado.png'

interface BelusChallengeProps {
  navigation: NavigationProp<any>
}

const BelusChallenge: React.FC<BelusChallengeProps> = () => {
  const won = useSharedValue<number>(0)
  const background = useSharedValue<number>(0)
  const { colors } = useColors()
  const { width, height } = useWindowDimensions()
  const { LOWER_BOUND, UPPER_BOUND, GROUND } = useGeneralDimensions()
  const newX = useSharedValue<number>((width - 150) / 2)
  const newY = useSharedValue<number>(GROUND)
  const hunger = useSharedValue<number>(0)
  const dead = useSharedValue<number>(0)
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
    if (!dead.value) {
      eyes.value = withSequence(
        withTiming(0, { duration: 200 }),
        withTiming(1, { duration: 300 }),
      )
    }
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
      if (!dead.value) {
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
  const composedGesture = Gesture.Simultaneous(panGesture, tapGesture)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: newX.value }, { translateY: newY.value }],
    backgroundColor: withTiming(
      interpolateColor(dead.value, [0, 1], [colors.slimy, colors.deadSlimy]),
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
      backgroundColor:
        won.value === 1
          ? '#7c9c88'
          : won.value === -1
            ? LightColors.darkerDarkerGray
            : 'white',
    }
  })
  const textContainerStyle = useAnimatedStyle(() => {
    return { opacity: withTiming(won.value, { duration: 2000 }) }
  })
  const textLostStyle = useAnimatedStyle(() => {
    return { opacity: withTiming(-won.value, { duration: 2000 }) }
  })

  const l1 = useSharedValue<number>(1)
  const l2 = useSharedValue<number>(1)
  const l3 = useSharedValue<number>(1)
  const lives = [l1, l2, l3]
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: mix(Math.abs(background.value), 0, 2.5),
        },
      ],
      borderRadius: 300,
      backgroundColor: lives[2].value
        ? '#7c9c88'
        : LightColors.darkerDarkerGray,
      width,
      overflow: 'hidden',
      height: width,
    }
  })
  const fruitStyle = useAnimatedStyle(() => ({
    zIndex: 100,
    transform: [
      { scale: fruitScale.value },
      { translateX: fruitPositionX.value },
      { translateY: fruitPositionY.value },
    ],
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
      //misses
      if (fruitPositionY.value === height) {
        const index = lives.findIndex(elem => elem.value)
        if (index !== -1) {
          lives[index].value = 0
          if (index !== 2) {
            fruitScale.value = 1
            fruitPositionY.value = -50
            fruitPositionY.value = withTiming(height, { duration: 4000 })
            fruitPositionX.value = Math.random() * (width - 150) + 75
          } else {
            background.value = withTiming(1, { duration: 2000 }, () => {
              won.value = -1
              background.value = withTiming(0)
              dead.value = 1
              eyes.value = withTiming(0, { duration: 2000 })
            })
          }
        }
      }
    },
    [fruitPositionY.value],
  )

  return (
    <Animated.View style={[styles.flexible, bgStyle]}>
      <Stack.Screen options={{ title: "Belu's Challenge" }} />
      <Animated.View style={[backgroundStyle, styles.background]} />
      <Animated.View style={fruitStyle}>
        <Image source={Avocado} style={styles.fruit} />
      </Animated.View>
      <GestureDetector gesture={composedGesture}>
        <Slimy
          animatedStyle={animatedStyle}
          eyes={eyes}
          mouth={mouth}
          dead={dead}
        />
      </GestureDetector>
      <View style={[styles.floor, { width, backgroundColor: colors.light }]} />
      <Animated.View
        style={[
          styles.barContainer,
          {
            backgroundColor: colors.light,
          },
        ]}>
        <Animated.View style={[barStyle, styles.bar]} />
      </Animated.View>
      <View style={styles.livesContainer}>
        <Lives lives={lives} />
        <Animated.View style={[textContainerStyle, styles.textContainer]}>
          <Text style={styles.title}>YOU WON!</Text>
          <Text style={styles.subtitle}>CONGRATULATIONS!</Text>
        </Animated.View>
        <Animated.View style={[textLostStyle, styles.textContainer]}>
          <Text style={styles.title}>Slimy died.</Text>
          <Text style={styles.subtitle}>sad</Text>
        </Animated.View>
      </View>
    </Animated.View>
  )
}

export default BelusChallenge
