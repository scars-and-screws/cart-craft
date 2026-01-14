import { IoClose } from 'react-icons/io5'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

/**
 * CartDropdown - The dropdown panel showing cart contents
 * @param {array} cart - Array of cart items
 * @param {number} itemCount - Total number of items
 * @param {string} total - Formatted total price
 * @param {function} onClose - Handler to close dropdown
 * @param {function} onRemoveItem - Handler to remove an item
 * @param {function} onClearCart - Handler to clear entire cart
 * @param {function} onCheckout - Handler for checkout
 */
const CartDropdown = ({
  cart,
  itemCount,
  total,
  onClose,
  onRemoveItem,
  onClearCart,
  onCheckout
}) => {
  return (
    <>
      {/* Backdrop - click outside to close */}
      <div
        className='fixed inset-0 z-40'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Dropdown Panel */}
      <div className='absolute right-0 mt-2 w-80 bg-white border border-neutral-200 rounded-lg shadow-lg z-50'>
        {/* Header */}
        <CartDropdownHeader itemCount={itemCount} onClose={onClose} />

        {/* Content */}
        <div className='p-4'>
          {cart.length === 0 ? (
            <CartEmptyState />
          ) : (
            <>
              {/* Items List */}
              <ul className='space-y-3 max-h-60 overflow-y-auto'>
                {cart.map(item => (
                  <CartItem key={item.id} item={item} onRemove={onRemoveItem} />
                ))}
              </ul>

              {/* Summary with total and buttons */}
              <CartSummary
                total={total}
                onCheckout={onCheckout}
                onClear={onClearCart}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

/**
 * CartDropdownHeader - Header section with title and close button
 */
const CartDropdownHeader = ({ itemCount, onClose }) => {
  return (
    <div className='px-4 py-3 border-b border-neutral-100 flex items-center justify-between'>
      <div>
        <p className='font-medium text-neutral-900'>Cart</p>
        <p className='text-sm text-neutral-500'>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
      </div>
      <button
        onClick={onClose}
        className='p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded transition-colors'
        aria-label='Close cart'
      >
        <IoClose className='w-5 h-5' />
      </button>
    </div>
  )
}

/**
 * CartEmptyState - Shown when cart is empty
 */
const CartEmptyState = () => {
  return (
    <p className='text-center text-neutral-500 text-sm py-4'>
      Your cart is empty
    </p>
  )
}

export default CartDropdown
