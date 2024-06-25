import { StyleSheet } from 'react-native'
import { SLIMY_SIDE } from '../hooks/useGeneralDimensions'

export const styles = StyleSheet.create({
  flexible: {
    flex: 1,
  },
  floor: {
    position: 'absolute',
    height: 170,
    bottom: 0,
    zIndex: -1,
  },
  slimy: {
    height: SLIMY_SIDE,
    width: SLIMY_SIDE,
    position: 'absolute',
    borderRadius: 10,
    bottom: 80,
  },
  eye: {
    position: 'absolute',
    top: 50,
    borderRadius: 10,
    width: 20,
    borderBottomWidth: 2,
    height: 20,
  },
})
