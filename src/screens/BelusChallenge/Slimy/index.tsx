import { transform } from 'lodash'
import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { StyleProps } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes'
import useColors from '../../../theme/colors'
import { styles } from '../styles'
import { Eye } from './Eye'
import { Mouth } from './Mouth'
// import Mouth from '../../../assets/mouth.svg'

interface SlimyProps {
  eyes: SharedValue<number>
  animatedStyle: StyleProps
  mouth: SharedValue<number>
  dead: SharedValue<number>
}

export const Slimy: React.FC<SlimyProps> = ({
  animatedStyle,
  eyes,
  mouth,
  dead,
}) => {
  const { colors } = useColors()
  const tearStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(dead.value) }, { rotate: '45deg' }],
  }))

  return (
    <Animated.View
      style={[
        styles.slimy,
        {
          backgroundColor: colors.slimy,
        },
        animatedStyle,
      ]}>
      <Eye eyes={eyes} left={20} />
      <Eye eyes={eyes} right={20} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 50,
        }}>
        <Mouth mouth={mouth} />
      </View>
      <Animated.View
        style={[
          {
            top: 80,
            right: 30,
            position: 'absolute',
            width: 15,
            height: 15,
            backgroundColor: 'skyblue',
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            borderTopEndRadius: 10,
            borderTopColor: 'white',
            borderBottomColor: 'white',
            borderTopWidth: 4,
          },
          tearStyle,
        ]}></Animated.View>
    </Animated.View>
  )
}
