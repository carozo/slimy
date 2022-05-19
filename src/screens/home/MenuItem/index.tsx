import React from 'react'
import { Pressable, Text, useWindowDimensions } from 'react-native'
import useColors from '../../../theme/colors'
import { styles } from '../styles'

interface MenuItemProps {
  title: string
  onPress: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, onPress }) => {
  const { width } = useWindowDimensions()
  const { colors } = useColors()
  return (
    <Pressable onPress={onPress} style={[styles.menuItem, { width }]}>
      <Text style={{ color: colors.dark }}>{title}</Text>
    </Pressable>
  )
}
