import React from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Colors } from '../../../theme/colors'
import { styles } from '../styles'
import { Eye } from './Eye'

interface SlimyProps {
  eyes: SharedValue<number>
  translation: SharedValue<{ x: number; y: number }>
}

export const Slimy: React.FC<SlimyProps> = ({ eyes, translation }) => {
  const { width } = useWindowDimensions()
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translation.value.x },
      { translateY: translation.value.y },
    ],
  }))

  return (
    <Animated.View
      style={[
        styles.slimy,
        {
          left: (width - 150) / 2,
          backgroundColor: Colors.slimy,
        },
        animatedStyle,
      ]}>
      <Eye eyes={eyes} left={20} />
      <Eye eyes={eyes} right={20} />
    </Animated.View>
  )
}
