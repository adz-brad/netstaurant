import React, { useContext } from 'react'
import StoreContext from '../context/StoreContext'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'


const LineItem = props => {
  const { line_item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = line_item.variant.image ? (
    <img
      className="w-1/4"
      src={line_item.variant.image.src}
      alt={`${line_item.title} Product`}
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id)
  }

  return (
    <div className="flex flex-col sm:flex-row items-center border-b-2 border-gray-400">

      {variantImage}

      <div className="w-full flex flex-col mx-auto px-5">

        <span className="text-xl font-semibold">{line_item.title}</span>

        <div className="flex flex-row items-center text-lg font-medium">
          <span className="m-1">Quantity:</span><span>{line_item.quantity}</span>
        </div>

      </div>

      <div className="hover:text-primary-600 cursor-pointer" onClick={handleRemove}>
        <Icon icon={faMinusCircle} className="text-xl m-3" />
      </div>

    </div>
  )
}

export default LineItem
