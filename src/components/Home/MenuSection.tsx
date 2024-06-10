import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../theme/colors'

interface MenuItemProps {
  title: string
}

export const MenuSection: React.FC<MenuItemProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingLeft: 20,
    backgroundColor: Colors.theLastGray,
  },
  title: {
    color: Colors.light,
    fontWeight: '500',
  },
})
