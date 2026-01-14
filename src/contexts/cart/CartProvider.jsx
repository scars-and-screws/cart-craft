import { useState, useEffect } from 'react'
import { CartContext } from './CartContext'

// ============================================
// HELPER FUNCTION: Load cart from localStorage
// ============================================
// This runs ONCE when the app starts
// It checks if there's a saved cart in the browser
const loadCartFromStorage = () => {
  try {
    // Step 1: Get the saved cart string from browser storage
    const savedCart = localStorage.getItem('cart')

    // Step 2: If there's no saved cart, return empty array
    if (!savedCart) {
      return []
    }

    // Step 3: Convert the string back to an array
    // localStorage only stores strings, so we need JSON.parse()
    const cartArray = JSON.parse(savedCart)
    return cartArray
  } catch (error) {
    // If something goes wrong (corrupted data), start fresh
    console.error('[CartContext] Failed to load cart:', error)
    return []
  }
}

export const CartProvider = ({ children }) => {
  // ============================================
  // STATE: The cart array
  // ============================================
  // Initialize with data from localStorage (if any)
  const [cart, setCart] = useState(loadCartFromStorage)

  // ============================================
  // EFFECT: Save cart to localStorage whenever it changes
  // ============================================
  useEffect(() => {
    // Convert cart array to string and save it
    // This way, cart survives page refresh!
    const cartString = JSON.stringify(cart)
    localStorage.setItem('cart', cartString)
  }, [cart]) // <- Runs every time 'cart' changes

  // ============================================
  // FUNCTION: Add a product to cart
  // ============================================
  const addToCart = product => {
    setCart(currentCart => {
      // Step 1: Check if this product is already in cart
      const existingItem = currentCart.find(item => item.id === product.id)

      // Step 2a: If product EXISTS in cart, increase quantity
      if (existingItem) {
        // Loop through cart and update the matching item
        const updatedCart = currentCart.map(item => {
          if (item.id === product.id) {
            // Found it! Increase qty by 1
            return {
              ...item, // Keep all existing properties (id, name, price, etc.)
              qty: item.qty + 1 // Update qty
            }
          }
          // Not the item we're looking for, keep it unchanged
          return item
        })
        return updatedCart
      }

      // Step 2b: If product is NEW, add it to cart with qty: 1
      const newItem = {
        ...product, // Copy all product properties
        qty: 1 // Start with quantity of 1
      }
      const newCart = [...currentCart, newItem]
      return newCart
    })

    // Debug log (only in development mode)
    if (import.meta.env.DEV) {
      console.log('[CartContext] Added:', product.name)
    }
  }

  // ============================================
  // FUNCTION: Remove a product from cart
  // ============================================
  const removeFromCart = productId => {
    setCart(currentCart => {
      // filter() creates a NEW array with only items that pass the test
      // We keep items where id does NOT match the one we want to remove
      const updatedCart = currentCart.filter(item => item.id !== productId)
      return updatedCart
    })

    if (import.meta.env.DEV) {
      console.log('[CartContext] Removed item:', productId)
    }
  }

  // ============================================
  // FUNCTION: Clear entire cart
  // ============================================
  const clearCart = () => {
    // Simply set cart to empty array
    setCart([])

    if (import.meta.env.DEV) {
      console.log('[CartContext] Cart cleared')
    }
  }

  // Debug log in development
  if (import.meta.env.DEV) {
    console.log('[CartContext] Current cart:', cart)
  }

  // ============================================
  // RENDER: Provide cart data to all children
  // ============================================
  return (
    <CartContext.Provider
      value={{
        cart, // The cart array
        addToCart, // Function to add items
        removeFromCart, // Function to remove items
        clearCart // Function to clear cart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Helps identify this context in React DevTools
CartProvider.displayName = 'CartProvider'
