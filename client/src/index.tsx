import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import './firebase';

import { App } from './components/App';
import './index.sass';
import store from './store';
import { NotifyProvider } from './hoc/NotifyProvider';
import client from './apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client} >
        <NotifyProvider>
          <App />
        </NotifyProvider>
      </ApolloProvider>
    </BrowserRouter>
  </Provider>
);
