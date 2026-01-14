import { useCart } from '../contexts/cart'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className='bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md hover:border-neutral-300 transition-all duration-200 flex flex-col'>
      {/* Image */}
      <div className='bg-neutral-100 p-4'>
        <img
          src={product.image}
          alt={product.name}
          className='h-40 w-full object-contain'
        />
      </div>

      {/* Content */}
      <div className='p-4 flex flex-col flex-1'>
        {/* Category */}
        <span className='text-xs text-neutral-500 uppercase tracking-wide'>
          {product.category}
        </span>

        {/* Title */}
        <h2 className='font-medium text-neutral-900 mt-1 line-clamp-1'>
          {product.name}
        </h2>

        {/* Description */}
        <p className='text-sm text-neutral-500 mt-1 line-clamp-2'>
          {product.description}
        </p>

        {/* Price & Button - mt-auto pushes this to bottom */}
        <div className='flex items-center justify-between mt-auto pt-4'>
          <span className='text-lg font-semibold text-neutral-900'>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className='px-4 py-2 text-sm font-medium bg-neutral-900 text-white rounded-md hover:bg-neutral-800 active:scale-[0.98] transition-all'
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
