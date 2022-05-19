import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import store from './store';
import useColors from './theme/colors';

const App: React.FC = () => {
  const { colors, isDark } = useColors();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.white}
      />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </>
  );
};

export default App;
