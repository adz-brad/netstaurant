import React, { useContext, useState } from 'react'
import StoreContext from '../context/StoreContext'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
  
const LineItem = props => {
  const { line_item } = props
  const {
    removeLineItem, updateLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = line_item.variant.image ? (
    <img
      className="w-1/5 md:w-1/4"
      src={line_item.variant.image.src}
      alt={`${line_item.title} Product`}
    />
  ) : null

    const productRemoved = () => {  
      toast("Product Removed from Cart", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        className: "custom-toast",
      });
    }

    const quantityUpdated = () => {
      toast("Quantity Updated", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        className: "custom-toast",
      });
    }

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id);
    productRemoved();
  }

  const [ quantity = line_item.quantity ] = useState();

  const handleQuantityIncrease = () => {
    updateLineItem(client, checkout.id, line_item.id, quantity + 1);
    quantityUpdated();
  }

  const handleQuantityDecrease = () => {
    updateLineItem(client, checkout.id, line_item.id, quantity - 1);
    quantityUpdated();
  }

  const itemPrice = line_item.variant.price;
  const itemTotal = (itemPrice * quantity).toFixed(2);

  return (

    <div className="relative flex flex-row items-center border-b-2 border-gray-400">

      {variantImage}

      <div className="text-lg md:text-xl w-4/5 md:w-3/4 flex flex-col ml-auto mr-2 px-5 py-1">

        <span className=" font-semibold leading-tight">{line_item.title}</span>

        <div className="flex flex-row items-center font-medium">
          <span className="mr-3">Quantity:</span>
          <Icon className="text-base text-primary-700 hover:text-primary-600 cursor-pointer h-7" icon={faMinus} onClick={handleQuantityDecrease}/>
          <span className="mx-4">{quantity}</span>
          <Icon className="text-base text-primary-700 hover:text-primary-600 cursor-pointer h-7" icon={faPlus} onClick={handleQuantityIncrease}/>
        </div>

        <div className="flex flex-row items-center">
          <span className="mr-3">Item Total:</span>
          <span className="mx-4">{itemTotal}</span>
          </div>
       
      </div>

      <div className="absolute top-50 right-0 hover:text-primary-600 cursor-pointer" onClick={handleRemove} onKeyDown={handleRemove} role="button" tabIndex="0">
        <Icon icon={faMinusCircle} className="text-lg md:text-xl m-1" />
      </div>

    </div>
  )
}

export default LineItem
