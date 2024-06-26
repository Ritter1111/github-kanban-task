import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import App from './components/App/App.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
