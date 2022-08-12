import React from 'react'
import { View } from 'react-native'
import { LightColors } from '../../../theme/colors'
import { Heart } from './Heart'
import { styles } from './styles'

interface LivesProps {
  //props
}

export const Lives: React.FC<LivesProps> = ({}) => {
  return (
    <View style={{}}>
      <Heart />
      <Heart />
      <Heart />
    </View>
  )
}
