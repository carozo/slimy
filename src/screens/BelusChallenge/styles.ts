import {  StyleSheet } from 'react-native'


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
    justifyContent: 'flex-end',
  },
  eye: {
    position: 'absolute',
    top: 50,
    borderRadius: 10,
    width: 20,
    borderBottomWidth: 2,
    height: 20
  },
  title: {
    zIndex: 1,
    textAlign: 'center',
    paddingTop: 25,
    fontSize: 60,
    color: 'white',
    letterSpacing: 6,
    fontWeight: '200',
  },
  subtitle: {
    zIndex: 1,
    textAlign: 'center',
    paddingTop: 25,
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 30,
    letterSpacing: 6,
    fontWeight: '200',
  },
  fruit: { 
    height: 50, 
    width: 50 
  },
  barContainer: {
    borderRadius: 10,
    height: 20,
    marginHorizontal: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 5,
    zIndex: -1,
  },
  livesContainer: {
    justifyContent: 'flex-start',
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    zIndex: -1,
  },
  textContainer: {
    paddingTop: 25,
    position: 'absolute',
    zIndex: 1,
  },
  bar: {
    height: 13,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  background: {
    zIndex: -1,
    position: 'absolute',
  }
})