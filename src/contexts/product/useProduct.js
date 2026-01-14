import { useContext } from 'react'
import { ProductContext } from './ProductContext'

/**
 * Custom hook to access product context
 * @returns {{ products: Array, loading: boolean, error: string | null }}
 * @throws Error if used outside ProductProvider
 */
export const useProducts = () => {
  const context = useContext(ProductContext)

  // Debug helper: Warn if context is undefined (used outside Provider)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }

  return context
}
