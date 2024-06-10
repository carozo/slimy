import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../theme/colors'

export const Floor = () => <View style={styles.floor} />

const styles = StyleSheet.create({
  floor: {
    position: 'absolute',
    height: 170,
    width: '100%',
    left: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: Colors.light,
  },
})
