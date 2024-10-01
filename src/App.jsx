import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// pages & components
import HomePage from './pages/HomePage'
import CartPage from './components/CartContainer'
import ProductsContainer from './components/ProductsContainer'


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      children: [
        {
          index: true,
          element: <ProductsContainer />
        },
        {
          path: '/cart-items',
          element: <CartPage />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App