import { createContext } from 'react'

// ============================================
// UNDERSTANDING: Context vs useState
// ============================================
//
// USE CONTEXT FOR:
// ✅ Data shared by MULTIPLE components (cart, user, theme)
// ✅ Data that needs to be accessed deep in component tree
// ✅ Global app state (authentication, settings)
//
// USE LOCAL useState FOR:
// ✅ UI state for ONE component only (dropdown open/close)
// ✅ Form inputs (text fields, checkboxes)
// ✅ Temporary state (hover effects, loading for one button)
//
// EXAMPLE IN THIS APP:
// - cart → Context (Header displays it, ProductCard adds to it)
// - showDropdown → useState (only Header needs it)
//
// ============================================
// CONTEXT DEFAULT VALUES
// ============================================
//
// The value passed to createContext() is the DEFAULT value.
// This default is used ONLY when a component tries to use
// the context WITHOUT being wrapped in a Provider.
//
// Benefits of default values:
// 1. IDE autocomplete - shows available properties
// 2. Documentation - shows the "shape" of your context
// 3. Prevents crashes if accidentally used outside Provider
// 4. Useful for testing components in isolation
//
// NOTE: These defaults are FALLBACKS, not initial values!
// The actual initial values come from useState in the Provider.
//
export const CartContext = createContext({
  // -------- DATA --------
  cart: [], // Array of cart items

  // -------- FUNCTIONS --------
  // Empty functions as placeholders (won't do anything if Provider is missing)
  addToCart: () => {
    console.warn('addToCart called without CartProvider!')
  },
  removeFromCart: () => {
    console.warn('removeFromCart called without CartProvider!')
  },
  clearCart: () => {
    console.warn('clearCart called without CartProvider!')
  }
})
