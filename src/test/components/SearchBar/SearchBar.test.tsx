import { render, fireEvent, act } from '@testing-library/react';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

describe('SearchBar component', () => {
  it('renders search input correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const inputElement = getByPlaceholderText('Enter repo URL');
    expect(inputElement).toBeInTheDocument();
  });

  it('updates input value on input change', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const inputElement = getByPlaceholderText(
      'Enter repo URL'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.input(inputElement, { target: { value: 'http://git/ritter' } });
    });

    expect(inputElement.value).toBe('http://git/ritter');
  });
});
