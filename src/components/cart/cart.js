import React, { useContext } from 'react'
import StoreContext from '../context/StoreContext'
import LineItem from './LineItem'

const Cart = () => {
  const {
    store: { checkout },
    
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const line_items = checkout.lineItems.map(line_item => {
    return <LineItem key={line_item.id.toString()} line_item={line_item} />
  })

  return (

    <React.Fragment>

      <div className="py-2">
        {line_items}
      </div>

      <div className="w-full pt-3 flex flex-col items-center lg:items-end">
      
        <div className="pr-3 py-1 flex items-center">
          <span className="mr-2 text-xl font-semibold">Subtotal</span>
          <span className="text-xl">${checkout.subtotalPrice}</span>
        </div>

        <div className="pr-3 py-1 flex items-center">
          <span className="mr-2 text-xl font-semibold">Taxes</span>
          <span className="text-xl">$ {checkout.totalTax}</span>
        </div>

        <div className="pr-3 py-1 flex items-center">
          <span className="mr-2 text-2xl font-bold">Total</span>
          <span className="text-2xl font-medium">${checkout.totalPrice}</span>
        </div>

        <div className="mx-auto md:w-1/4 p-3">
          <button className="button w-full" onClick={handleCheckout} disabled={checkout.lineItems.length === 0}>Check out</button>
        </div>

      </div>

    </React.Fragment>
  )
}

export default Cart
