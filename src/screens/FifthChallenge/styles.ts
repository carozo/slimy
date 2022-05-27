import { StyleSheet } from 'react-native'

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
    height: 150,
    width: 150,
    position: 'absolute',
    borderRadius: 10,
  },
  eye: {
    position: 'absolute',
    top: 50,
    borderRadius: 10,
    width: 20,
    borderBottomWidth: 2,
    height: 20
  },
  text: {
    textAlign: 'center',
    paddingTop: 25,
    fontSize: 20,
    paddingHorizontal: 30,
    fontWeight: '300'
  }
})