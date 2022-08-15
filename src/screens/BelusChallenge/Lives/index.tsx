import React from 'react'
import { View } from 'react-native'
import { SharedValue } from 'react-native-reanimated'
import { Heart } from './Heart'

interface LivesProps {
  lives: SharedValue<number>[]
}

export const Lives: React.FC<LivesProps> = ({ lives }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
      }}>
      <View style={{ flex: 2, alignItems: 'flex-end' }}>
        <Heart full={lives[2]} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Heart full={lives[1]} />
      </View>
      <View style={{ flex: 2, alignItems: 'flex-start' }}>
        <Heart full={lives[0]} />
      </View>
    </View>
  )
}
