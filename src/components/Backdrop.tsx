import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../theme/colors'

export const Backdrop = ({ children }: PropsWithChildren) => (
  <View style={styles.backdrop}>{children}</View>
)

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
  },
})
