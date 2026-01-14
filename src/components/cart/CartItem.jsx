import { IoClose } from 'react-icons/io5'

/**
 * CartItem - Single item row in the cart dropdown
 * @param {object} item - Cart item with id, name, image, price, qty
 * @param {function} onRemove - Handler to remove item from cart
 */
const CartItem = ({ item, onRemove }) => {
  return (
    <li className='flex items-center gap-3'>
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className='w-12 h-12 object-contain bg-neutral-100 rounded'
      />

      {/* Product Info */}
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium text-neutral-900 truncate'>
          {item.name}
        </p>
        <p className='text-sm text-neutral-500'>
          {item.qty} × ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className='text-neutral-400 hover:text-neutral-600 p-1'
        aria-label={`Remove ${item.name} from cart`}
      >
        <IoClose className='w-4 h-4' />
      </button>
    </li>
  )
}

export default CartItem
