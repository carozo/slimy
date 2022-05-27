import React from 'react'
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { mix } from 'react-native-redash'
import Svg, { Path } from 'react-native-svg'

//->
// M0 15L11 4L3.5 4M11 4L11 11.5

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface XLProps {
  xlimy: SharedValue<number>
}
export const XL: React.FC<XLProps> = ({ xlimy }) => {
  const animatedProps = useAnimatedProps(() => {
    const path = `
    M${mix(xlimy.value, 0, 0)} ${mix(xlimy.value, 15, 15)}L${mix(
      xlimy.value,
      0,
      11,
    )} ${mix(xlimy.value, 15, 4)}L${mix(xlimy.value, 0, 3.5)} ${mix(
      xlimy.value,
      15,
      4,
    )}M${mix(xlimy.value, 0, 11)} ${mix(xlimy.value, 15, 4)}L${mix(
      xlimy.value,
      0,
      11,
    )} ${mix(xlimy.value, 15, 11.5)}
    `
    return {
      d: path,
    }
  })
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: xlimy.value === 0 ? 0 : 1,
  }))
  return (
    <Animated.View style={animatedStyle}>
      <Svg width="150" height="150" viewBox="0 0 15 15" fill="none">
        <AnimatedPath
          animatedProps={animatedProps}
          stroke={'white'}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  )
}
