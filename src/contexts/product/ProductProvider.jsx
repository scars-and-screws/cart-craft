import { useEffect, useState } from 'react'
import { ProductContext } from './ProductContext'

export const ProductProvider = ({ children }) => {
  // ============================================
  // STATE: Products, Loading, and Error
  // ============================================
  const [products, setProducts] = useState([]) // Array of products from API
  const [loading, setLoading] = useState(true) // Is data still loading?
  const [error, setError] = useState(null) // Error message (if any)

  // ============================================
  // EFFECT: Fetch products when component mounts
  // ============================================
  // Empty dependency array [] means this runs ONCE when app starts
  useEffect(() => {
    // Define the async function inside useEffect
    const fetchProducts = async () => {
      try {
        // Step 1: Make the API request
        const response = await fetch('/api/products')

        // Step 2: Check if request was successful
        // response.ok is true if status is 200-299
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        // Step 3: Convert response to JSON
        const data = await response.json()

        // Step 4: Save products to state
        setProducts(data)
      } catch (err) {
        // If anything goes wrong, save the error message
        setError(err.message)
      } finally {
        // This runs whether success or error
        // Stop showing the loading spinner
        setLoading(false)
      }
    }

    // Call the function we just defined
    fetchProducts()
  }, []) // <- Empty array = run once on mount

  // Debug log in development
  if (import.meta.env.DEV) {
    console.log('[ProductContext]', {
      productCount: products.length,
      loading,
      error
    })
  }

  // ============================================
  // RENDER: Provide products data to all children
  // ============================================
  return (
    <ProductContext.Provider
      value={{
        products, // Array of products
        loading, // Boolean: true while fetching
        error // String or null: error message
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

// Helps identify this context in React DevTools
ProductProvider.displayName = 'ProductProvider'
