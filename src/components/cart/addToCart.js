import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import StoreContext from '../context/StoreContext'

const ProductForm = ({ product }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product
  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)
  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(() => {
        // this checks the currently selected variant for availability
        const result = variants.filter(
          variant => variant.shopifyId === productVariant.shopifyId
        )
        setAvailable(result[0].availableForSale)
      })
    },
    [client.product, productVariant.shopifyId, variants]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
  }

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  return (
    <React.Fragment>

        <div className="border-b-2 border-primary-700 pt-3 mb-5"/>

        <div className="flex flex-col md:flex-row items-center">

            <div className="flex flex-col">

                <div className="flex flex-row items-center">

                    <label className="text-2xl font-medium mr-2 py-1" htmlFor="quantity">Quantity:</label>
                    
                    <input
                        className="w-20 p-1 text-2xl border-black border-b text-center"
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        step="1"
                        onChange={handleQuantityChange}
                        value={quantity}
                    />

                </div>

            </div>

            <span className="text-2xl font-medium text-green-600 text-center m-auto py-3">{price}</span>
        
        

        <button
            className="button my-3 py-2 px-3 text-white text-2xl"
            type="submit"
            disabled={!available || adding}
            onClick={handleAddToCart}
        >
            Add to Cart
        </button>

        {!available && <p>This Product is out of Stock!</p>}
        </div>
    </React.Fragment>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm
