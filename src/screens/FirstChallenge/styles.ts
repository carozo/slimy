import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  floor: {
    position: 'absolute',
    height: 170,
    bottom: 0,
    zIndex: -1,
  },
  slimy: {
    height: 150,
        width: 150,
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
  borderEndWidth: 5,
  height: 20},
})