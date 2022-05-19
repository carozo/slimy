import React from 'react'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import useColors from '../../../../theme/colors'
import { styles } from '../../styles'

interface EyeProps {
  eyes: SharedValue<number>
  left?: number
  right?: number
}

export const Eye: React.FC<EyeProps> = ({ eyes, left, right }) => {
  const { colors } = useColors()
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(eyes.value, [0, 1], [10, 0]) }],
    height: interpolate(eyes.value, [0, 1], [2, 20]),
  }))
  return (
    <Animated.View
      style={[
        styles.eye,
        {
          left,
          right,
          backgroundColor: colors.black,
          borderBottomColor: colors.black,
          borderEndColor: colors.white,
        },
        animatedStyle,
      ]}
    />
  )
}
