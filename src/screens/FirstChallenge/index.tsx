import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { Button, ScrollView, useWindowDimensions, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import useColors from '../../theme/colors'

interface FirstChallengeProps {
  navigation: NavigationProp<any>
}

export const FirstChallenge: React.FC<FirstChallengeProps> = ({
  navigation,
}) => {
  const { height, width } = useWindowDimensions()
  const { colors } = useColors()

  const eyes = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(eyes.value, [0, 1], [10, 0]) }],
    height: interpolate(eyes.value, [0, 1], [2, 20]),
  }))
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Button
        title="Open eyes"
        onPress={() => {
          eyes.value = withTiming(eyes.value === 1 ? 0 : 1)
        }}
      />
      <View
        style={{
          height: 150,
          width: 150,
          position: 'absolute',
          borderRadius: 10,
          bottom: 80,
          left: (width - 150) / 2,
          backgroundColor: colors.slimy,
        }}>
        <Animated.View
          style={[
            {
              backgroundColor: colors.black,
              position: 'absolute',
              top: 50,
              left: 20,
              borderRadius: 10,
              width: 20,
              borderBottomColor: colors.black,
              borderBottomWidth: 2,
              borderEndColor: 'white',
              borderEndWidth: 5,
              height: 20,
            },
            animatedStyle,
          ]}>
          {/* <View
            style={{
              backgroundColor: 'white',
              left: 4,
              width: 7,
              height: 7,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          /> */}
        </Animated.View>
        <Animated.View
          style={[
            {
              backgroundColor: colors.black,
              position: 'absolute',
              top: 50,
              right: 20,
              borderRadius: 10,
              width: 20,
              height: 20,
              borderEndColor: '#fefefe',
              borderEndWidth: 5,
              borderTopColor: colors.black,
              borderBottomColor: colors.black,
              borderBottomWidth: 2,
              transform: [{ rotateZ: '60deg' }],
              // bor
            },
            animatedStyle,
          ]}>
          {/* <View
            style={{
              backgroundColor: 'white',
              left: 4,
              width: 7,
              height: 7,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          /> */}
        </Animated.View>
      </View>
      <View
        style={{
          position: 'absolute',
          height: 170,
          width,
          backgroundColor: colors.light,
          bottom: 0,
          zIndex: -1,
        }}></View>
    </View>
  )
}
