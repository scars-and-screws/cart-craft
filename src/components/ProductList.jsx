import { useProducts } from '../contexts/product'
import ProductCard from './ProductCard'

const ProductList = () => {
  const { products, loading, error } = useProducts()

  // Loading - Simple skeleton
  if (loading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div
            key={i}
            className='bg-white border border-neutral-200 rounded-lg overflow-hidden'
          >
            <div className='bg-neutral-100 h-40 animate-pulse' />
            <div className='p-4 space-y-3'>
              <div className='h-3 bg-neutral-100 rounded w-16 animate-pulse' />
              <div className='h-4 bg-neutral-100 rounded w-3/4 animate-pulse' />
              <div className='h-3 bg-neutral-100 rounded w-full animate-pulse' />
              <div className='flex justify-between pt-2'>
                <div className='h-5 bg-neutral-100 rounded w-16 animate-pulse' />
                <div className='h-8 bg-neutral-100 rounded w-24 animate-pulse' />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <div className='text-center py-12 border border-neutral-200 rounded-lg bg-white'>
        <p className='text-neutral-900 font-medium'>Something went wrong</p>
        <p className='text-neutral-500 text-sm mt-1'>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 text-sm bg-neutral-900 text-white rounded-md hover:bg-neutral-800'
        >
          Try again
        </button>
      </div>
    )
  }

  // Empty
  if (products.length === 0) {
    return (
      <div className='text-center py-12 border border-neutral-200 rounded-lg bg-white'>
        <p className='text-neutral-900 font-medium'>No products found</p>
        <p className='text-neutral-500 text-sm mt-1'>Check back later</p>
      </div>
    )
  }

  // Grid
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
