import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';

import Counter from './Counter';
import counter from '../store/counter';

describe('Counter', () => {
  it('defaults to 0', () => {
    const store = configureStore({ reducer: { counter } });

    const { getByTestId } = render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    );

    const count = getByTestId('count');

    expect(count).toHaveTextContent(/0/);
  });

  it('increments on [+] press', () => {
    const store = configureStore({ reducer: { counter } });

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    );

    const count = getByTestId('count');
    const increment = getByText('+');

    fireEvent.press(increment);

    expect(count).toHaveTextContent(/1/);
  });

  it('decrements on [-] press', () => {
    const store = configureStore({ reducer: { counter } });

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    );

    const count = getByTestId('count');
    const decrement = getByText('-');

    fireEvent.press(decrement);

    expect(count).toHaveTextContent(/-1/);
  });
});
