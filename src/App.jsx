import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// root page 
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
// components
import CartPage from './components/CartContainer'
import ProductsContainer from './components/ProductsContainer'
import ProductDetails from './components/ProductDetails'


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
          path: '/product-details/:id',
          element: <ProductDetails />
        },
        {
          path: '/cart-items',
          element: <CartPage />
        },
        {
          path: '/about',
          element: <AboutPage />
        },
        {
          path: '/contact-us',
          element: <ContactPage />
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App