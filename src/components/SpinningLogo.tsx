import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SpinningLogo: React.FC = () => {
  const spin = useSharedValue(0);
  spin.value = withRepeat(
    withTiming(360, { duration: 5000, easing: Easing.linear }),
    -1,
  );
  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));
  return (
    <Animated.Image
      source={require('../assets/logo.png')}
      style={[styles.logo, style]}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default SpinningLogo;
