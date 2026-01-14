/**
 * CartSummary - Total price and action buttons (checkout, clear)
 * @param {string} total - Formatted total price
 * @param {function} onCheckout - Handler for checkout button
 * @param {function} onClear - Handler for clear cart button
 */
const CartSummary = ({ total, onCheckout, onClear }) => {
  return (
    <div>
      {/* Divider */}
      <div className='border-t border-neutral-100 my-3' />

      {/* Total */}
      <div className='flex justify-between mb-3'>
        <span className='text-sm text-neutral-600'>Total</span>
        <span className='font-semibold text-neutral-900'>${total}</span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className='w-full py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 active:scale-[0.98] transition-all'
      >
        Checkout
      </button>

      {/* Clear Cart Button */}
      <button
        onClick={onClear}
        className='w-full py-2 mt-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors'
      >
        Clear cart
      </button>
    </div>
  )
}

export default CartSummary
