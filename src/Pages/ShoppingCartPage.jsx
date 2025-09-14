import { lazy } from 'react'
const Cart = lazy(() => import('../Components/ShoppingCart/Cart'))

function ShoppingCartPage() {
    
    return (
        <>
            <Cart />
        </>
    )
}

export default ShoppingCartPage
