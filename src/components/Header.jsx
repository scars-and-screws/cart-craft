import { useCart } from '../contexts/cart'
import { useState } from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'

// Helper: Calculate total items
const calculateItemCount = cart => {
  let total = 0
  for (const item of cart) {
    total += item.qty
  }
  return total
}

// Helper: Calculate total price
const calculateTotalPrice = cart => {
  let total = 0
  for (const item of cart) {
    total += item.price * item.qty
  }
  return total.toFixed(2)
}

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { cart, removeFromCart, clearCart } = useCart()

  const itemCount = calculateItemCount(cart)
  const total = calculateTotalPrice(cart)

  // Close dropdown helper
  const closeDropdown = () => setShowDropdown(false)

  // Handle remove item - close dropdown if cart becomes empty
  const handleRemoveItem = itemId => {
    removeFromCart(itemId)
    // If this was the last item, close the dropdown
    if (cart.length === 1) {
      closeDropdown()
    }
  }

  // Handle clear cart - close dropdown after clearing
  const handleClearCart = () => {
    clearCart()
    closeDropdown()
  }

  return (
    <header className='fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-sm border-b border-neutral-200 z-50'>
      <div className='max-w-6xl mx-auto px-4 h-full flex items-center justify-between'>
        {/* Logo */}
        <span className='font-bold text-2xl text-neutral-900'>CartCraft</span>

        {/* Cart */}
        <div className='relative'>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className='relative p-2 hover:bg-neutral-100 rounded-md transition-colors'
          >
            <HiOutlineShoppingCart className='w-5 h-5 text-neutral-700' />

            {/* Badge */}
            {itemCount > 0 && (
              <span className='absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-white text-xs font-medium rounded-full flex items-center justify-center'>
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <>
              {/* Backdrop - click outside to close */}
              <div
                className='fixed inset-0 z-40'
                onClick={closeDropdown}
                aria-hidden='true'
              />

              <div className='absolute right-0 mt-2 w-80 bg-white border border-neutral-200 rounded-lg shadow-lg z-50'>
                {/* Header with close button */}
                <div className='px-4 py-3 border-b border-neutral-100 flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-neutral-900'>Cart</p>
                    <p className='text-sm text-neutral-500'>
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  <button
                    onClick={closeDropdown}
                    className='p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded transition-colors'
                    aria-label='Close cart'
                  >
                    <IoClose className='w-5 h-5' />
                  </button>
                </div>

                {/* Content */}
                <div className='p-4'>
                  {cart.length === 0 ? (
                    <p className='text-center text-neutral-500 text-sm py-4'>
                      Your cart is empty
                    </p>
                  ) : (
                    <>
                      {/* Items */}
                      <ul className='space-y-3 max-h-60 overflow-y-auto'>
                        {cart.map(item => (
                          <li key={item.id} className='flex items-center gap-3'>
                            <img
                              src={item.image}
                              alt={item.name}
                              className='w-12 h-12 object-contain bg-neutral-100 rounded'
                            />
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-medium text-neutral-900 truncate'>
                                {item.name}
                              </p>
                              <p className='text-sm text-neutral-500'>
                                {item.qty} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className='text-neutral-400 hover:text-neutral-600 p-1'
                            >
                              <IoClose className='w-4 h-4' />
                            </button>
                          </li>
                        ))}
                      </ul>

                      {/* Divider */}
                      <div className='border-t border-neutral-100 my-3' />

                      {/* Total */}
                      <div className='flex justify-between mb-3'>
                        <span className='text-sm text-neutral-600'>Total</span>
                        <span className='font-semibold text-neutral-900'>
                          ${total}
                        </span>
                      </div>

                      {/* Buttons */}
                      <button className='w-full py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 active:scale-[0.98] transition-all'>
                        Checkout
                      </button>
                      <button
                        onClick={handleClearCart}
                        className='w-full py-2 mt-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors'
                      >
                        Clear cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
