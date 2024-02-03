import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css'
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import { store } from './redux/store';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/find-car',
    element: <SearchPage />
  },
  {
    path: '*',
    element: <Home />
  }
])
function App() {
  return <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
}

export default App
