import { render, screen } from '@testing-library/react';
import App from '../../../components/App/App';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

describe('App component', () => {
  it('render App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('Contains searchBar compenent', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Enter repo URL')).toBeInTheDocument();
  });
});
