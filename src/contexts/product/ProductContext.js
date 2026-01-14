import { createContext } from 'react'

// ============================================
// PRODUCT CONTEXT - Why use Context here?
// ============================================
//
// Products are stored in Context because:
// 1. ProductList needs to display all products
// 2. Could be filtered/searched from a SearchBar component
// 3. Fetched ONCE, used by multiple components
//
// If products were in local useState (in ProductList):
// - Every time you navigate away and back, it would refetch
// - Other components couldn't access the products list
//
// ============================================
// DEFAULT VALUES EXPLANATION
// ============================================
//
// These defaults define the \"shape\" of your context.
// They're used if you forget to wrap your app in ProductProvider.
//
// IMPORTANT DISTINCTION:
// - DEFAULT VALUE (below): Fallback if Provider is missing
// - INITIAL VALUE: Set in ProductProvider via useState([])
//
export const ProductContext = createContext({
  products: [], // Will be filled with data from API
  loading: true, // Starts true, becomes false after fetch
  error: null // null = no error, string = error message
})
