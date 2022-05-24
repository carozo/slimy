import React from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, { SharedValue } from 'react-native-reanimated'
import { StyleProps } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes'
import useColors from '../../../theme/colors'
import { styles } from '../styles'
import { Eye } from './Eye'

interface SlimyProps {
  eyes: SharedValue<number>
  animatedStyle: StyleProps
}

export const Slimy: React.FC<SlimyProps> = ({ animatedStyle, eyes }) => {
  const { width } = useWindowDimensions()
  const { colors } = useColors()

  return (
    <Animated.View
      style={[
        styles.slimy,
        {
          left: (width - 150) / 2,
          backgroundColor: colors.slimy,
        },
        animatedStyle,
      ]}>
      <Eye eyes={eyes} left={20} />
      <Eye eyes={eyes} right={20} />
    </Animated.View>
  )
}
