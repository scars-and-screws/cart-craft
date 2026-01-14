import { useState } from 'react'
import { useCart } from '../contexts/cart'
import { CartButton, CartDropdown } from './cart'

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate total number of items in cart (considering quantities)
 * @param {array} cart - Array of cart items
 * @returns {number} Total item count
 */
const calculateItemCount = cart => {
  let total = 0
  for (const item of cart) {
    total += item.qty
  }
  return total
}

/**
 * Calculate total price of all items in cart
 * @param {array} cart - Array of cart items
 * @returns {string} Formatted total price
 */
const calculateTotalPrice = cart => {
  let total = 0
  for (const item of cart) {
    total += item.price * item.qty
  }
  return total.toFixed(2)
}

// ============================================
// HEADER COMPONENT
// ============================================

const Header = () => {
  // Local state - only Header needs to know if dropdown is open
  const [showDropdown, setShowDropdown] = useState(false)

  // Global state - cart data shared across app
  const { cart, removeFromCart, clearCart } = useCart()

  // Derived values
  const itemCount = calculateItemCount(cart)
  const total = calculateTotalPrice(cart)

  // ============================================
  // EVENT HANDLERS
  // ============================================

  const closeDropdown = () => setShowDropdown(false)
  const toggleDropdown = () => setShowDropdown(prev => !prev)

  /**
   * Remove item and close dropdown if cart becomes empty
   */
  const handleRemoveItem = itemId => {
    removeFromCart(itemId)
    // Close dropdown if this was the last item
    if (cart.length === 1) {
      closeDropdown()
    }
  }

  /**
   * Clear all items and close dropdown
   */
  const handleClearCart = () => {
    clearCart()
    closeDropdown()
  }

  /**
   * Handle checkout (placeholder for future implementation)
   */
  const handleCheckout = () => {
    // TODO: Implement checkout flow
    console.log('Checkout clicked - implement checkout flow')
  }

  // ============================================
  // RENDER
  // ============================================

  return (
    <header className='fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-sm border-b border-neutral-200 z-50'>
      <div className='max-w-6xl mx-auto px-4 h-full flex items-center justify-between'>
        {/* Logo */}
        <span className='font-bold text-2xl text-neutral-900'>CartCraft</span>

        {/* Cart Section */}
        <div className='relative'>
          {/* Cart Button with Badge */}
          <CartButton itemCount={itemCount} onClick={toggleDropdown} />

          {/* Cart Dropdown (only rendered when open) */}
          {showDropdown && (
            <CartDropdown
              cart={cart}
              itemCount={itemCount}
              total={total}
              onClose={closeDropdown}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onCheckout={handleCheckout}
            />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
