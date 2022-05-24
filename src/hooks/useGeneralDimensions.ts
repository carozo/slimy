import { useWindowDimensions } from 'react-native'

export const SLIMY_SIDE = 150

const HALF_SLIMY = SLIMY_SIDE / 2

const UPPER_BOUND = 0

export const useGeneralDimensions = () => {
  const {height, width} = useWindowDimensions()
  const GROUND = height - 320
  const LOWER_BOUND = GROUND
  const LEFT_BOUND = HALF_SLIMY - width / 2
  const RIGHT_BOUND = -LEFT_BOUND
  return {
    UPPER_BOUND,
    LEFT_BOUND,
    LOWER_BOUND, 
    RIGHT_BOUND,
    SLIMY_SIDE,
    GROUND,
  }
}
