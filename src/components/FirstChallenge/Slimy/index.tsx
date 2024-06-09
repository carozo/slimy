import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import { SharedValue } from 'react-native-reanimated'
import useColors from '../../../theme/colors'
import { Eye } from './Eye'
import { styles } from '../styles'

interface SlimyProps {
  eyes: SharedValue<number>
}

export const Slimy: React.FC<SlimyProps> = ({ eyes }) => {
  const { width } = useWindowDimensions()
  const { colors } = useColors()

  return (
    <View
      style={[
        styles.slimy,
        {
          left: (width - 150) / 2,
          backgroundColor: colors.slimy,
        },
      ]}>
      <Eye eyes={eyes} left={20} />
      <Eye eyes={eyes} right={20} />
    </View>
  )
}
