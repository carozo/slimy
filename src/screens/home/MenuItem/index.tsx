import React from 'react'
import { Pressable, Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenProps } from 'react-native-screens'
import useColors from '../../../theme/colors'
import { styles } from './styles'

interface MenuItemProps {
  title: string
  onPress: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, onPress }) => {
  const { width } = useWindowDimensions()
  const { colors } = useColors()
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 80,
        width,
        backgroundColor: '#eee',
        borderColor: '#bbb',
        borderWidth: 0.5,
        justifyContent: 'center',
        paddingLeft: 20,
      }}>
      <Text style={{ color: colors.dark }}>{title}</Text>
    </Pressable>
  )
}
