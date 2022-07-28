import React from 'react'
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated'
import { mix } from 'react-native-redash'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface MouthProps {
  mouth: SharedValue<number>
}
export const Mouth: React.FC<MouthProps> = ({ mouth }) => {
  const animatedProps1 = useAnimatedProps(() => {
    const path = `
    M 10 10 C${mix(mouth.value, 10, 20)} ${mix(mouth.value, 10, 25)}, ${mix(
      mouth.value,
      30,
      40,
    )} ${mix(mouth.value, 10, 25)}, 50 10
    `
    return {
      d: path,
    }
  })
  const animatedProps2 = useAnimatedProps(() => {
    const path = `
    M 10 10 C 10 10, 28 ${mix(mouth.value, 12, -10)}, 50 10
    `
    return {
      d: path,
    }
  })
  return (
    <Animated.View>
      <Svg width="60" height="30" viewBox="0 0 60 30" fill={'black'}>
        <AnimatedPath
          animatedProps={animatedProps1}
          stroke={'black'}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <AnimatedPath
          animatedProps={animatedProps2}
          stroke={'black'}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  )
}
