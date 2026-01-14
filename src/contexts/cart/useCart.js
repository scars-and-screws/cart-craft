import { useContext } from 'react'
import { CartContext } from './CartContext'

/**
 * Custom hook to access cart context
 * @returns {{ cart: Array, addToCart: Function, removeFromCart: Function, clearCart: Function }}
 * @throws Error if used outside CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext)

  // Debug helper: Warn if context is undefined (used outside Provider)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
