import { NavigationProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions, View, Text, Image } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import useColors, { LightColors } from '../../theme/colors'
import { Slimy } from './Slimy'
import { styles } from './styles'
import { clamp, mix } from 'react-native-redash'
import { useGeneralDimensions } from '../../hooks/useGeneralDimensions'
import { Lives } from './Lives'
import Avocado from '../../assets/food/avocado.png'
import Apple from '../../assets/food/apple.png'
import Banana from '../../assets/food/banana.png'
import Carrot from '../../assets/food/carrot.png'
import Grape from '../../assets/food/grape.png'
import Kiwi from '../../assets/food/kiwi.png'

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
  const textStyle = useAnimatedStyle(() => {
    return { opacity: withTiming(won.value, { duration: 2000 }) }
  })
  const textLostStyle = useAnimatedStyle(() => {
    return { opacity: withTiming(-won.value, { duration: 2000 }) }
  })

  const l1 = useSharedValue<number>(1)
  const l2 = useSharedValue<number>(1)
  const l3 = useSharedValue<number>(1)
  // const lives = new Array(3).fill(useSharedValue<number>(1))
  const lives = [l1, l2, l3]
  const backgroundStyle = useAnimatedStyle(() => {
    console.log(background.value)
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
      //TODO: ver como hacer bien el scale
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
        console.log(lives)
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

  const fruitImage = [Avocado, Apple, Banana, Carrot, Grape, Kiwi]

  return (
    <Animated.View style={[styles.flexible, bgStyle]}>
      <Animated.View
        style={[
          backgroundStyle,
          {
            zIndex: -1,
            position: 'absolute',
          },
        ]}></Animated.View>
      <Animated.View style={fruitStyle}>
        <Image source={Avocado} style={{ height: 50, width: 50 }}></Image>
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
          justifyContent: 'flex-start',
          paddingTop: 20,
          flex: 1,
          alignItems: 'center',
          zIndex: -1,
        }}>
        <Lives lives={lives} />
        <Animated.View
          style={[
            textStyle,
            {
              paddingTop: 25,
              position: 'absolute',
              zIndex: 1,
            },
          ]}>
          <Text style={styles.text}>YOU WON!</Text>
          <Text style={styles.text2}>CONGRATULATIONS!</Text>
        </Animated.View>
        <Animated.View
          style={[
            textLostStyle,
            {
              paddingTop: 25,
              position: 'absolute',
              zIndex: 1,
            },
          ]}>
          <Text style={styles.text}>Slimy died.</Text>
          <Text style={styles.text2}>sad</Text>
        </Animated.View>
      </View>
    </Animated.View>
  )
}
