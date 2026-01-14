import { HiOutlineShoppingCart } from 'react-icons/hi'

/**
 * CartButton - The cart icon button with item count badge
 * @param {number} itemCount - Total number of items in cart
 * @param {function} onClick - Handler when button is clicked
 */
const CartButton = ({ itemCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='relative p-2 hover:bg-neutral-100 rounded-md transition-colors'
      aria-label='Open cart'
    >
      <HiOutlineShoppingCart className='w-5 h-5 text-neutral-700' />

      {/* Badge - only show when cart has items */}
      {itemCount > 0 && (
        <span className='absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-white text-xs font-medium rounded-full flex items-center justify-center'>
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  )
}

export default CartButton
