import React from 'react'
import { View } from 'react-native'
import { LightColors } from '../../../../theme/colors'

interface HeartProps {
  //props
}

export const Heart: React.FC<HeartProps> = ({}) => {
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          width: 13,
          height: 20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: LightColors.darkerPrimary,
          left: 5,
          transform: [{ rotate: '45deg' }],
        }}></View>
      <View
        style={{
          position: 'absolute',
          width: 13,
          height: 20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: LightColors.primary,
          left: 0,
          transform: [{ rotate: '-45deg' }],
        }}></View>
    </View>
  )
}
