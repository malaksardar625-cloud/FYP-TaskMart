import { useState, useCallback, useMemo } from 'react'
import { CartContext } from './cartContext'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      const id = item._id || item.id
      const exists = prev.find((i) => (i._id || i.id) === id)
      if (exists) {
        return prev.map((i) =>
          (i._id || i.id) === id ? { ...i, qty: (i.qty || 1) + 1 } : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => (i._id || i.id) !== id))
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return
    setCartItems((prev) =>
      prev.map((i) => ((i._id || i.id) === id ? { ...i, qty } : i))
    )
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + (i.qty || 1), 0),
    [cartItems]
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
