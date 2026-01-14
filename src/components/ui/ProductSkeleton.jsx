/**
 * ProductSkeleton - Loading placeholder for a single product card
 * Shows animated pulse effect while content is loading
 */
const ProductSkeleton = () => {
  return (
    <div className='bg-white border border-neutral-200 rounded-lg overflow-hidden'>
      {/* Image placeholder */}
      <div className='bg-neutral-100 h-40 animate-pulse' />

      {/* Content placeholders */}
      <div className='p-4 space-y-3'>
        {/* Category */}
        <div className='h-3 bg-neutral-100 rounded w-16 animate-pulse' />
        {/* Title */}
        <div className='h-4 bg-neutral-100 rounded w-3/4 animate-pulse' />
        {/* Description */}
        <div className='h-3 bg-neutral-100 rounded w-full animate-pulse' />
        {/* Price & Button */}
        <div className='flex justify-between pt-2'>
          <div className='h-5 bg-neutral-100 rounded w-16 animate-pulse' />
          <div className='h-8 bg-neutral-100 rounded w-24 animate-pulse' />
        </div>
      </div>
    </div>
  )
}

/**
 * ProductSkeletonGrid - Grid of skeleton cards for loading state
 * @param {number} count - Number of skeleton cards to show (default: 6)
 */
export const ProductSkeletonGrid = ({ count = 6 }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: count }, (_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}

export default ProductSkeleton
