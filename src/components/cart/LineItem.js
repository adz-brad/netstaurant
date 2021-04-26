import React, { useContext } from 'react'
import StoreContext from '../context/StoreContext'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';

const LineItem = props => {
  const { line_item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = line_item.variant.image ? (
    <img
      className="w-1/5 md:w-1/4"
      src={line_item.variant.image.src}
      alt={`${line_item.title} Product`}
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      )
    : null

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

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id);
    productRemoved();
  }

  return (

    <div className="relative flex flex-row items-center border-b-2 border-gray-400">

      {variantImage}

      <div className="text-lg md:text-xl w-4/5 md:w-3/4 flex flex-col ml-auto mr-2 px-5 py-1">

        <span className=" font-semibold leading-tight">{line_item.title}</span>

        <div className="flex flex-row items-center  font-medium">
          <span className="mr-2">Quantity:</span><span>{line_item.quantity}</span>
        </div>

      </div>

      <div className="absolute top-50 right-0 hover:text-primary-600 cursor-pointer" onClick={handleRemove}>
        <Icon icon={faMinusCircle} className="text-lg md:text-xl m-1" />
      </div>

    </div>
  )
}

export default LineItem
