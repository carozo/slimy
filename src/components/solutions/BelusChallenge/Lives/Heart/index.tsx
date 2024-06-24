import React from 'react'
import { View } from 'react-native'
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { Colors } from '../../../../../theme/colors'

interface HeartProps {
  full: SharedValue<number>
}

export const Heart: React.FC<HeartProps> = ({ full }) => {
  const heartStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        interpolateColor(full.value, [0, 1], [Colors.gray, Colors.primary]),
        { duration: 700 },
      ),
    }
  })
  const backHeartStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        interpolateColor(
          full.value,
          [0, 1],
          [Colors.darkerGray, Colors.darkerPrimary],
        ),
        { duration: 700 },
      ),
    }
  })
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: 13,
            height: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: Colors.darkerPrimary,
            left: 5,
            transform: [{ rotate: '45deg' }],
          },
          backHeartStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: 13,
            height: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            left: 0,
            transform: [{ rotate: '-45deg' }],
          },
          heartStyle,
        ]}
      />
    </View>
  )
}
