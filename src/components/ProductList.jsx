import { useProducts } from '../contexts/product'
import ProductCard from './ProductCard'
import { EmptyState, ProductSkeletonGrid } from './ui'

const ProductList = () => {
  const { products, loading, error } = useProducts()

  // Loading state - show skeleton placeholders
  if (loading) {
    return <ProductSkeletonGrid count={6} />
  }

  // Error state - show error message with retry
  if (error) {
    return (
      <EmptyState
        title='Something went wrong'
        subtitle={error}
        actionLabel='Try again'
        onAction={() => window.location.reload()}
      />
    )
  }

  // Empty state - no products available
  if (products.length === 0) {
    return <EmptyState title='No products found' subtitle='Check back later' />
  }

  // Success state - render product grid
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
