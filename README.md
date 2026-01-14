# 🛒 CartCraft - React Shopping Cart

A modern, beginner-friendly shopping cart application built with **React 19**, **Context API**, **Tailwind CSS v4**, and **Vite**. This project is designed to help you understand React state management patterns, especially the Context API.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat&logo=tailwindcss)

---

## 📸 Preview

A clean, minimal e-commerce interface with:

- Product grid with images, prices, and "Add to cart" buttons
- Cart dropdown with item list, total calculation, and checkout button
- Persistent cart (survives page refresh)
- Responsive design for all screen sizes

---

## 🎯 What You'll Learn

This project teaches you:

| Concept                   | Where It's Used                     |
| ------------------------- | ----------------------------------- |
| **Context API**           | Global state for cart and products  |
| **Custom Hooks**          | `useCart()` and `useProducts()`     |
| **useState**              | Local component state (dropdown)    |
| **useEffect**             | Data fetching, localStorage sync    |
| **Barrel Exports**        | Clean imports with `index.js` files |
| **Component Composition** | Modular, reusable UI components     |
| **Vite Proxy**            | API routing during development      |
| **Tailwind CSS v4**       | Modern utility-first styling        |

---

## 📁 Project Structure

```
cart-craft/
├── 📄 index.html              # Entry HTML file
├── 📄 package.json            # Dependencies & scripts
├── 📄 vite.config.js          # Vite configuration with proxy
├── 📄 eslint.config.js        # Linting rules
│
├── 📂 public/
│   └── 📂 images/             # Product images
│
└── 📂 src/
    ├── 📄 main.jsx            # App entry point with Providers
    ├── 📄 App.jsx             # Main layout component
    ├── 📄 index.css           # Tailwind imports
    │
    ├── 📂 components/
    │   ├── 📄 index.js        # Barrel export for all components
    │   ├── 📄 Header.jsx      # Navigation bar (uses cart components)
    │   ├── 📄 ProductList.jsx # Product grid (uses UI components)
    │   ├── 📄 ProductCard.jsx # Individual product display
    │   │
    │   ├── 📂 cart/           # Cart-specific components
    │   │   ├── 📄 index.js    # Barrel export
    │   │   ├── 📄 CartButton.jsx    # Cart icon with badge
    │   │   ├── 📄 CartDropdown.jsx  # Dropdown container
    │   │   ├── 📄 CartItem.jsx      # Single cart item row
    │   │   └── 📄 CartSummary.jsx   # Total + action buttons
    │   │
    │   └── 📂 ui/             # Reusable UI components
    │       ├── 📄 index.js    # Barrel export
    │       ├── 📄 EmptyState.jsx    # Generic empty/error state
    │       └── 📄 ProductSkeleton.jsx # Loading skeleton
    │
    ├── 📂 contexts/
    │   ├── 📂 cart/           # Cart state management
    │   │   ├── 📄 CartContext.js
    │   │   ├── 📄 CartProvider.jsx
    │   │   ├── 📄 useCart.js
    │   │   └── 📄 index.js    # Barrel export
    │   │
    │   └── 📂 product/        # Products state management
    │       ├── 📄 ProductContext.js
    │       ├── 📄 ProductProvider.jsx
    │       ├── 📄 useProduct.js
    │       └── 📄 index.js    # Barrel export
    │
    └── 📂 data/
        └── 📄 db.json         # Mock product database
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation

1️⃣ **Clone the repository**

```bash
git clone https://github.com/scars-and-screws/cart-craft.git
cd cart-craft
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Start the JSON Server** (mock API)

```bash
npm run jserv
```

This starts the mock API at `http://localhost:8000`

4️⃣ **Start the development server** (in a new terminal)

```bash
npm run dev
```

Open your browser at `http://localhost:5173`

### Available Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start Vite dev server        |
| `npm run jserv`   | Start JSON Server (mock API) |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Run ESLint                   |

---

## 🧠 Understanding the Architecture

### The Context API Pattern

This project uses a structured pattern for each context:

```
contexts/
└── cart/
    ├── CartContext.js    → Creates the context with defaults
    ├── CartProvider.jsx  → Manages state & provides values
    ├── useCart.js        → Custom hook to consume context
    └── index.js          → Barrel export for clean imports
```

Let's understand each file:

---

### 1️⃣ CartContext.js - Creating the Context

```javascript
import { createContext } from 'react'

export const CartContext = createContext({
  // Default values (used when no Provider exists)
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {}
})
```

**What are default values for?**

- 📝 **Documentation**: Shows the "shape" of your context
- 💡 **IDE Autocomplete**: Helps with suggestions
- 🛡️ **Crash Prevention**: Falls back if used outside Provider
- 🧪 **Testing**: Useful for testing components in isolation

---

### 2️⃣ CartProvider.jsx - Managing the State

This is where the magic happens! The Provider:

- Holds the actual state (`useState`)
- Defines functions to modify state
- Syncs with localStorage for persistence

```jsx
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(loadCartFromStorage)

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Functions to modify cart
  const addToCart = product => {
    /* ... */
  }
  const removeFromCart = productId => {
    /* ... */
  }
  const clearCart = () => {
    /* ... */
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
```

---

### 3️⃣ useCart.js - Custom Hook

A clean way to access the context with error handling:

```javascript
import { useContext } from 'react'
import { CartContext } from './CartContext'

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
```

**Why a custom hook?**

- ✅ Cleaner syntax: `useCart()` vs `useContext(CartContext)`
- ✅ Built-in error checking
- ✅ Easy to add additional logic later

---

### 4️⃣ index.js - Barrel Export

Makes imports clean and organized:

```javascript
// Barrel export
export { CartContext } from './CartContext'
export { CartProvider } from './CartProvider'
export { useCart } from './useCart'
```

**Before (without barrel export):**

```javascript
import { CartProvider } from './contexts/cart/CartProvider'
import { useCart } from './contexts/cart/useCart'
```

**After (with barrel export):**

```javascript
import { CartProvider, useCart } from './contexts/cart'
```

---

## ⚡ Context vs useState - When to Use What?

This is one of the most important concepts to understand:

### Use **Context** for:

| ✅ Use Case                              | Example                                  |
| ---------------------------------------- | ---------------------------------------- |
| Data shared by **multiple** components   | Cart (Header displays, ProductCard adds) |
| Data accessed **deep** in component tree | User authentication                      |
| **Global** app state                     | Theme, language settings                 |

### Use **useState** for:

| ✅ Use Case                    | Example                        |
| ------------------------------ | ------------------------------ |
| UI state for **one** component | Dropdown open/close            |
| **Form** inputs                | Text fields, checkboxes        |
| **Temporary** state            | Loading spinner for one button |

### Example in This Project:

```jsx
const Header = () => {
  // ✅ LOCAL STATE - Only Header cares about dropdown
  const [showDropdown, setShowDropdown] = useState(false)

  // ✅ CONTEXT - Cart data shared across app
  const { cart, removeFromCart, clearCart } = useCart()

  // ...
}
```

---

## 🔌 API Proxy Configuration

The project uses Vite's proxy to forward API requests to json-server:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true
      }
    }
  }
})
```

**How it works:**

1. Your code fetches `/api/products`
2. Vite intercepts and rewrites to `/products`
3. Request goes to `http://localhost:8000/products`
4. json-server responds with data from `db.json`

**Why use a proxy?**

- 🔒 Avoids CORS issues
- 🔄 Same pattern as production (you'd replace target URL)
- 🧹 Clean URLs in your code

---

## 📦 Mock Database (db.json)

The `src/data/db.json` file contains product data:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "Noise-cancelling headphones with deep bass...",
      "price": 59.99,
      "quantity": 25,
      "category": "Audio",
      "rating": 4.5,
      "image": "images/product-1.png"
    }
    // ... more products
  ]
}
```

**To add new products:**

1. Add a new object to the `products` array
2. Place the image in `public/images/`
3. Reference it as `images/your-image.png`

---

## 🎨 Components Breakdown

This project uses a **modular component architecture** where larger components are broken down into smaller, reusable pieces. This makes the code easier to read, test, and maintain.

### Component Organization

```
components/
├── Header.jsx          # Orchestrates cart UI (uses cart/ components)
├── ProductList.jsx     # Orchestrates product grid (uses ui/ components)
├── ProductCard.jsx     # Single product display
│
├── cart/               # Cart-specific components
│   ├── CartButton.jsx      # Icon + badge
│   ├── CartDropdown.jsx    # Dropdown container
│   ├── CartItem.jsx        # Single item row
│   └── CartSummary.jsx     # Total + buttons
│
└── ui/                 # Reusable UI components
    ├── EmptyState.jsx      # Generic empty/error display
    └── ProductSkeleton.jsx # Loading placeholder
```

---

### 📂 cart/ Components

#### CartButton.jsx

The cart icon button with item count badge:

```jsx
/**
 * @param {number} itemCount - Total items in cart
 * @param {function} onClick - Toggle dropdown handler
 */
const CartButton = ({ itemCount, onClick }) => {
  return (
    <button onClick={onClick}>
      <HiOutlineShoppingCart />
      {itemCount > 0 && <span>{itemCount > 9 ? '9+' : itemCount}</span>}
    </button>
  )
}
```

#### CartItem.jsx

A single item row in the cart dropdown:

```jsx
/**
 * @param {object} item - Cart item (id, name, image, price, qty)
 * @param {function} onRemove - Remove item handler
 */
const CartItem = ({ item, onRemove }) => {
  // Displays: image, name, quantity × price, remove button
}
```

#### CartSummary.jsx

Total price and action buttons:

```jsx
/**
 * @param {string} total - Formatted total price
 * @param {function} onCheckout - Checkout handler
 * @param {function} onClear - Clear cart handler
 */
const CartSummary = ({ total, onCheckout, onClear }) => {
  // Displays: total, checkout button, clear cart button
}
```

#### CartDropdown.jsx

The dropdown container that orchestrates cart display:

```jsx
/**
 * Composes: CartItem, CartSummary
 * Handles: backdrop click-outside-to-close, empty state
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
  // Renders header, item list, and summary
}
```

---

### 📂 ui/ Components

#### EmptyState.jsx

A reusable component for empty or error states:

```jsx
/**
 * @param {string} title - Main message
 * @param {string} subtitle - Secondary message (optional)
 * @param {string} actionLabel - Button text (optional)
 * @param {function} onAction - Button handler (optional)
 */
const EmptyState = ({ title, subtitle, actionLabel, onAction }) => {
  // Flexible empty state with optional action button
}
```

**Usage examples:**

```jsx
// Simple empty state
<EmptyState title='No products found' subtitle='Check back later' />

// Error state with retry
<EmptyState
  title='Something went wrong'
  subtitle={error}
  actionLabel='Try again'
  onAction={() => window.location.reload()}
/>
```

#### ProductSkeleton.jsx

Loading placeholder for product cards:

```jsx
// Single skeleton card
const ProductSkeleton = () => {
  // Animated pulse placeholder matching ProductCard layout
}

// Grid of skeleton cards
export const ProductSkeletonGrid = ({ count = 6 }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: count }, (_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
```

---

### Header.jsx (Simplified)

Now uses the modular cart components:

```jsx
import { CartButton, CartDropdown } from './cart'

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { cart, removeFromCart, clearCart } = useCart()

  // Derived values
  const itemCount = calculateItemCount(cart)
  const total = calculateTotalPrice(cart)

  // Event handlers
  const handleRemoveItem = itemId => {
    removeFromCart(itemId)
    if (cart.length === 1) closeDropdown()
  }

  return (
    <header>
      <span>CartCraft</span>

      <div className='relative'>
        {/* Modular cart button */}
        <CartButton itemCount={itemCount} onClick={toggleDropdown} />

        {/* Modular cart dropdown */}
        {showDropdown && (
          <CartDropdown
            cart={cart}
            itemCount={itemCount}
            total={total}
            onClose={closeDropdown}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onCheckout={handleCheckout}
          />
        )}
      </div>
    </header>
  )
}
```

**UX Features:**

- 🔔 Badge shows item count (max "9+")
- 🖱️ Click anywhere outside to close dropdown
- ✖️ Dedicated close button
- 🧹 "Clear cart" closes dropdown automatically
- 📱 Responsive design

---

### ProductList.jsx (Simplified)

Now uses the modular UI components:

```jsx
import { EmptyState, ProductSkeletonGrid } from './ui'

const ProductList = () => {
  const { products, loading, error } = useProducts()

  // Loading state
  if (loading) return <ProductSkeletonGrid count={6} />

  // Error state
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

  // Empty state
  if (products.length === 0) {
    return <EmptyState title='No products found' subtitle='Check back later' />
  }

  // Success state
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

---

### ProductCard.jsx

Individual product display (unchanged - already focused):

```jsx
// Features:
// - Product image
// - Category label
// - Name (truncated if long)
// - Description (max 2 lines)
// - Price
// - "Add to cart" button
// - Flex layout for consistent alignment
```

---

### 🔄 Benefits of Modular Components

| Benefit             | Description                                   |
| ------------------- | --------------------------------------------- |
| **Readability**     | Each component has a single responsibility    |
| **Testability**     | Test components in isolation                  |
| **Reusability**     | Use `EmptyState` anywhere in the app          |
| **Maintainability** | Change one component without affecting others |
| **Debugging**       | Easier to find and fix issues                 |

**Example - Before vs After:**

```jsx
// BEFORE: Header.jsx was 160+ lines with everything inline

// AFTER: Header.jsx is ~100 lines, using:
import { CartButton, CartDropdown } from './cart'
// Each cart component is focused and testable
```

---

## 🔧 Customization Guide

### Change the App Name

Edit the logo in [Header.jsx](src/components/Header.jsx):

```jsx
<span className='font-bold text-2xl text-neutral-900'>YourAppName</span>
```

And the title in [index.html](index.html):

```html
<title>YourAppName</title>
```

---

### Change the Color Scheme

The app uses Tailwind's `neutral` palette. To change it:

1. Find all `neutral-*` classes
2. Replace with another Tailwind color:
   - `slate-*` (blue-gray)
   - `zinc-*` (cool gray)
   - `stone-*` (warm gray)
   - `gray-*` (pure gray)

**Example:**

```jsx
// Change from:
className = 'bg-neutral-900 text-white'

// To (blue theme):
className = 'bg-blue-600 text-white'
```

---

### Add More Products

Edit [src/data/db.json](src/data/db.json):

```json
{
  "products": [
    // ... existing products,
    {
      "id": 7,
      "name": "Your New Product",
      "description": "Product description here...",
      "price": 49.99,
      "quantity": 20,
      "category": "Category",
      "rating": 4.0,
      "image": "images/product-7.png"
    }
  ]
}
```

Don't forget to add the image to `public/images/`!

---

## 🚀 Extending the Project

Here are some ideas to practice and extend:

### Beginner Level

- [ ] Add product rating stars display
- [ ] Show "Out of stock" for quantity: 0
- [ ] Add product categories filter
- [ ] Implement quantity +/- buttons in cart
- [ ] Create a new UI component (e.g., `Badge.jsx`)

### Intermediate Level

- [ ] Add search functionality
- [ ] Implement product detail page (React Router)
- [ ] Add favorites/wishlist feature
- [ ] Implement checkout flow
- [ ] Add more cart components (e.g., `CartQuantitySelector.jsx`)

### Advanced Level

- [ ] Add user authentication
- [ ] Connect to a real backend (Express/Firebase)
- [ ] Add payment integration (Stripe)
- [ ] Implement order history
- [ ] Add unit tests for components

---

## 🐛 Debugging Tips

### React DevTools

Install the [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) browser extension to:

- View component tree
- Inspect props and state
- See Context values
- Profile performance

The contexts have `displayName` set for easy identification:

```jsx
CartProvider.displayName = 'CartProvider'
```

---

### Console Logs

Debug logs are enabled in development mode:

```jsx
if (import.meta.env.DEV) {
  console.log('[CartContext] Added:', product.name)
}
```

These won't appear in production builds.

---

### Common Issues

**1. "Failed to fetch products"**

- Make sure json-server is running (`npm run jserv`)
- Check if port 8000 is available

**2. "useCart must be used within CartProvider"**

- Ensure your component is inside the Provider tree in [main.jsx](src/main.jsx)

**3. Cart not persisting**

- Check browser localStorage (DevTools → Application → Local Storage)
- Make sure localStorage isn't disabled

**4. Component not found import error**

- Check that the component is exported in its `index.js` barrel file
- Verify the import path is correct

---

## 📚 Resources to Learn More

### React

- [Official React Docs](https://react.dev/)
- [React Context API](https://react.dev/reference/react/useContext)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

### Tailwind CSS

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind v4 Migration](https://tailwindcss.com/docs/upgrade-guide)

### Vite

- [Vite Guide](https://vite.dev/guide/)
- [Vite Proxy Config](https://vite.dev/config/server-options.html#server-proxy)

### JSON Server

- [JSON Server GitHub](https://github.com/typicode/json-server)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
