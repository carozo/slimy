import React from 'react'
import { Pressable, Text, useWindowDimensions } from 'react-native'
import { Colors } from '../../../theme/colors'
import { styles } from '../styles'

interface MenuItemProps {
  title: string
  onPress: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, onPress }) => {
  const { width } = useWindowDimensions()
  return (
    <Pressable onPress={onPress} style={[styles.menuItem, { width }]}>
      <Text style={{ color: Colors.dark }}>{title}</Text>
    </Pressable>
  )
}
