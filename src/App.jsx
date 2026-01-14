import Header from './components/Header'
import ProductList from './components/ProductList'

const App = () => {
  return (
    <div className='min-h-screen bg-neutral-50'>
      <Header />

      <main className='max-w-6xl mx-auto px-4 py-8 pt-20'>
        {/* Page Title */}
        <div className='mb-8'>
          <h1 className='text-2xl font-semibold text-neutral-900'>Products</h1>
          <p className='text-neutral-500 text-sm mt-1'>Browse our collection</p>
        </div>

        <ProductList />
      </main>
    </div>
  )
}

export default App
