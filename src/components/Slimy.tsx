import React from 'react'
import { useWindowDimensions, View, StyleSheet } from 'react-native'
import { Colors } from '../theme/colors'

const SLIMY_SIDE = 150

export const Slimy = () => {
  const { width } = useWindowDimensions()

  return <View style={[styles.slimy, { left: (width - SLIMY_SIDE) / 2 }]} />
}

const styles = StyleSheet.create({
  slimy: {
    position: 'absolute',
    bottom: 80,
    borderRadius: 10,
    height: SLIMY_SIDE,
    width: SLIMY_SIDE,
    backgroundColor: Colors.slimy,
  },
})
