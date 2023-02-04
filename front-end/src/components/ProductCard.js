/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { MdOutlineAdd, MdRemove } from 'react-icons/md';
import PropTypes from 'prop-types';

const nonExistentIndex = -1;

export default function ProductCard({
  product,
  shopCart,
  addItemCart,
  removeItemCart,
  updateItemCart,
}) {
  const [quantity, setQuantity] = useState(0);
  const { id, name, price, urlImage } = product;

  const itemIndex = shopCart.findIndex((item) => item.id === product.id);
  const itemQuantity = itemIndex !== nonExistentIndex ? (
    shopCart[itemIndex].quantity
  ) : (
    0
  );

  useEffect(() => {
    setQuantity(itemQuantity);
  }, [itemQuantity]);

  return (
    <div className="productCard-container">
      <div className="productCard-container-content">
        <p
          className="productCard-container-content-price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`R$ ${price.toString().replace('.', ',')}`}
        </p>
        <div className="productCard-container-content-product">
          <img
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            src={ urlImage }
            alt={ name }
          />
          <p data-testid={ `customer_products__element-card-title-${id}` }>
            {name}
          </p>
        </div>
        <div className="productCard-container-content-quantity">
          <button
            type="button"
            className="decreaseButton"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            disabled={ quantity === 0 }
            onClick={ () => removeItemCart(product) }
          >
            <MdRemove />
          </button>
          <label htmlFor="quantity">
            <input
              id="quantity"
              type="number"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              placeholder="0"
              value={ quantity }
              onChange={ ({ target }) => updateItemCart(product, Number(target.value)) }
            />
          </label>
          <button
            type="button"
            className="addButton"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ () => addItemCart(product) }
          >
            <MdOutlineAdd />
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  shopCart: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  addItemCart: PropTypes.func.isRequired,
  removeItemCart: PropTypes.func.isRequired,
  updateItemCart: PropTypes.func.isRequired,
};
