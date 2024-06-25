import React from 'react'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Colors } from '../../../../../theme/colors'
import { styles } from '../../styles'

interface EyeProps {
  eyes: SharedValue<number>
  left?: number
  right?: number
}

export const Eye: React.FC<EyeProps> = ({ eyes, left, right }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(eyes.value, [0, 1], [10, 0]) }],
    height: interpolate(eyes.value, [0, 1], [2, 20]),
    //next lines are not really necessary, it's just for the eye shine
    borderBottomWidth: interpolate(eyes.value, [0, 1], [0, 10]),
    borderEndWidth: interpolate(eyes.value, [0, 1], [0, 6]),
  }))
  return (
    <Animated.View
      style={[
        styles.eye,
        {
          left,
          right,
          backgroundColor: Colors.black,
          borderBottomColor: Colors.black,
          borderEndColor: Colors.white,
        },
        animatedStyle,
      ]}
    />
  )
}
